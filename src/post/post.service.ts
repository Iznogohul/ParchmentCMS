import { Body, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { plainToClass } from "class-transformer";

import { CreatePostDto } from "./dto/create-post.dto";
import { BlogPost, BlogPostDocument } from "@/schemas/post.schema";
import { BlogPostComment } from "@/schemas/comment.schema";
import {
  PostRelationConflict,
  PostDoesNotExist,
  PostError,
  PostCircularRelationship,
  PostSlugValidationError,
  PostIdValidationError,
  CommentDoesNotExist,
  PostDoesNotHaveComments,
  PostInsufficientPermissionsError,
  CommentInsufficientPermissionsError,
} from "./post.errors";
import { CreatedBlogPost } from "./types/post.types";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { BlogPostSanitizedResponse } from "./interfaces/post.interface";
import { sanitizeBlogPost, sanitizeBlogPosts } from "./utils/post.utils";

@Injectable()
export class PostService {
  constructor(@InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>) {}

  async createBlogPost(@Body() createPostDto: CreatePostDto, userId: mongoose.Types.ObjectId): Promise<CreatedBlogPost> {
    const post = plainToClass(BlogPost, createPostDto);
    const existingPost = await this.blogPostModel.findOne({
      title: post.title,
    });
    if (existingPost) {
      throw new PostRelationConflict(`Post with title \"${post.title}\" already exists.`);
    }

    const objectIdUserId = new mongoose.Types.ObjectId(userId);

    const newPost = new this.blogPostModel({
      ...post,
      createdBy: objectIdUserId,
    });

    const savedPost = await newPost.save();

    return {
      result: "success",
      title: savedPost.title,
      content: savedPost.content,
      imagePath: savedPost.imagePath,
    };
  }

  async getAllPosts(): Promise<BlogPostSanitizedResponse[]> {
    const posts = await this.blogPostModel.find().select("-__v").exec();
    if (posts.length <= 0) {
      throw new PostDoesNotExist("Posts are empty!");
    }
    return sanitizeBlogPosts(posts.map(post => post.toObject()));
  }

  async getPostBySlug(slug: string): Promise<BlogPostSanitizedResponse> {
    const isSlugValid = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(slug);
    if (isSlugValid === true) {
      const post = await this.blogPostModel
        .findOne({ slug: { $eq: slug } })
        .populate({ path: "createdBy", select: "username -_id" })
        .populate({ path: "updatedBy", select: "username -_id" })
        .select("-__v -_id")
        .exec();
      if (!post) {
        throw new PostDoesNotExist(`Post with slug \"${slug}\" doesn't exist.`);
      }
      return sanitizeBlogPost(post.toObject());
    } else {
      throw new PostSlugValidationError("Provided slug is not valid");
    }
  }

  async getPostsByPagination(page: number, limit: number): Promise<BlogPostSanitizedResponse[]> {
    const skip = page * limit;
    const postCount = await this.blogPostModel.countDocuments();
    if (postCount === 0) {
      throw new PostDoesNotExist("Posts are empty!");
    }

    const posts = await this.blogPostModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort("-createdAt")
      .populate({ path: "createdBy", select: "username -_id" })
      .populate({ path: "updatedBy", select: "username -_id" })
      .select("-__v")
      .exec();
    return sanitizeBlogPosts(posts.map(post => post.toObject()));
  }

  async getPostById(id: string): Promise<BlogPostSanitizedResponse> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new PostIdValidationError("Provided id is not valid");
    }
    const post = await this.blogPostModel.findById(id, "-__v -_id").exec();

    if (!post) {
      throw new PostDoesNotExist(`Post with id "${id}" doesn't exist.`);
    }

    await post.populate({ path: "createdBy", select: "username -_id" });
    await post.populate({ path: "updatedBy", select: "username -_id" });

    return sanitizeBlogPost(post.toObject());
  }

  async deletePost(id: string, userId: mongoose.Types.ObjectId): Promise<number> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new PostIdValidationError("Provided id is not valid");
    }
    const post = await this.blogPostModel.findOne({ _id: id }).select("-__v -_id");
    if (!post) {
      throw new PostDoesNotExist(`Post with id \"${id}\" doesn't exist.`);
    }

    if (!post.createdBy._id.equals(userId)) {
      throw new PostInsufficientPermissionsError(`You are not authorized to delete this post.`);
    }

    const result = await this.blogPostModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new PostError(`Didn't delete post with \"${id}\" .`);
    }
    return result.deletedCount;
  }

  async getRelatedPosts(id: string): Promise<{ relatedPosts: BlogPostDocument[] }> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new PostIdValidationError("Provided id is not valid");
    }
    const post = await this.blogPostModel.findOne({ _id: id }).select("-__v -_id");
    if (!post) {
      throw new PostDoesNotExist(`Post with id \"${id}\" doesn't exist.`);
    }
    return { relatedPosts: post.relatedPosts };
  }

  async createRelation(sourcePostId: string, relationPostId: string): Promise<BlogPostSanitizedResponse | undefined> {
    if (!mongoose.Types.ObjectId.isValid(sourcePostId)) {
      throw new PostIdValidationError("Provided sourcePostId is not valid");
    }
    if (!mongoose.Types.ObjectId.isValid(relationPostId)) {
      throw new PostIdValidationError("Provided relationPostId is not valid");
    }
    if (sourcePostId === relationPostId) {
      throw new PostCircularRelationship("Can't make a relation using only one post");
    }

    const sourcePost: BlogPostDocument = await this.blogPostModel.findOne({
      _id: sourcePostId,
    });
    if (!sourcePost) {
      throw new PostDoesNotExist("Post doesn't exist cant create a relationship with other Post");
    }

    const relationPost: BlogPostDocument = await this.blogPostModel.findOne({
      _id: relationPostId,
    });
    if (!relationPost) {
      throw new PostDoesNotExist("Relationship Post doesn't exist cant create a relationship with Post.");
    }
    const relationExists = sourcePost.relatedPosts.some(relatedPost => relatedPost._id.equals(relationPost._id));

    if (relationExists) {
      throw new PostRelationConflict("Relationship between posts already exists!");
    }
    sourcePost.relatedPosts.push(relationPost);
    const updatedPost = await sourcePost.save();
    await sourcePost.populate({ path: "createdBy", select: "username -_id" });
    await sourcePost.populate({ path: "updatedBy", select: "username -_id" });
    return sanitizeBlogPost(updatedPost.toObject());
  }

  async getComments(postId: string): Promise<BlogPostComment[]> {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new PostIdValidationError("Provided postId is not valid");
    }

    const post = await this.blogPostModel.findById(postId, "comments");

    if (!post) {
      throw new PostDoesNotExist(`Post with id "${postId}" doesn't exist.`);
    }
    if (!post.comments || post.comments.length === 0) {
      throw new PostDoesNotHaveComments(`Post comments are empty!`);
    }
    return post.comments;
  }

  async addComment(postId: string, createCommentDto: CreateCommentDto): Promise<BlogPostSanitizedResponse> {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new PostIdValidationError("Provided postId is not valid");
    }

    const post = await this.blogPostModel.findById(postId);
    if (!post) {
      throw new PostDoesNotExist(`Post with id \"${postId}\" doesn't exist.`);
    }

    const comment = {
      _id: new mongoose.Types.ObjectId(),
      author: createCommentDto.author,
      content: createCommentDto.content,
      date: new Date(),
    };

    post.comments.push(comment);
    await post.save();

    await post.populate({ path: "createdBy", select: "username -_id" });
    await post.populate({ path: "updatedBy", select: "username -_id" });

    return sanitizeBlogPost(post.toObject());
  }

  async deleteComment(postId: string, commentId: string, userId: mongoose.Types.ObjectId): Promise<{ success: boolean }> {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new PostIdValidationError("Provided postId is not valid");
    }

    const post = await this.blogPostModel.findById(postId);
    if (!post) {
      throw new PostDoesNotExist(`Post with id \"${postId}\" doesn't exist.`);
    }

    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);
    if (commentIndex === -1) {
      throw new CommentDoesNotExist(`Comment with id \"${commentId}\" doesn't exist.`);
    }
    if (post.createdBy._id.equals(userId)) {
      throw new CommentInsufficientPermissionsError("You are not authorized to delete comments on this post.");
    }

    post.comments.splice(commentIndex, 1);
    await post.save();

    return { success: true };
  }
}
