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
import { CreateCommentDto } from "./dto/create-comment.dto";
import { BlogPostSanitizedResponse, CreatedBlogPostResponse } from "./interfaces/post.interface";
import { sanitizeBlogPost, sanitizeBlogPosts } from "./utils/post.utils";

/**
 * @class PostService
 * Service for managing blog posts.
 *
 * The PostService class provides methods for creating, retrieving, updating,
 * and deleting blog posts, as well as managing comments associated with the posts.
 */
@Injectable()
export class PostService {
  /**
   * Constructs a new PostService.
   *
   * @param {Model<BlogPost>} blogPostModel - The Mongoose model for BlogPost.
   */
  constructor(@InjectModel(BlogPost.name) private blogPostModel: Model<BlogPost>) {}

  /**
   * Creates a new blog post.
   *
   * @param {CreatePostDto} createPostDto - The data transfer object containing the post details.
   * @param {mongoose.Types.ObjectId} userId - The ID of the user creating the post.
   * @returns {Promise<CreatedBlogPostResponse>} - The created blog post details.
   * @throws {PostRelationConflict} - If a post with the same title already exists.
   */
  async createBlogPost(@Body() createPostDto: CreatePostDto, userId: mongoose.Types.ObjectId): Promise<CreatedBlogPostResponse> {
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

  /**
   * Retrieves all blog posts.
   *
   * @returns {Promise<BlogPostSanitizedResponse[]>} - A list of sanitized blog posts.
   * @throws {PostDoesNotExist} - If no posts exist.
   */
  async getAllPosts(): Promise<BlogPostSanitizedResponse[]> {
    const posts = await this.blogPostModel.find().select("-__v").exec();
    if (posts.length <= 0) {
      throw new PostDoesNotExist("Posts are empty!");
    }
    return sanitizeBlogPosts(posts.map(post => post.toObject()));
  }

  /**
   * Retrieves a blog post by its slug.
   *
   * @param {string} slug - The slug of the blog post.
   * @returns {Promise<BlogPostSanitizedResponse>} - The sanitized blog post.
   * @throws {PostDoesNotExist} - If no post with the given slug exists.
   * @throws {PostSlugValidationError} - If the provided slug is not valid.
   */
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

  /**
   * Retrieves posts with pagination.
   *
   * @param {number} page - The page number to retrieve.
   * @param {number} limit - The number of posts per page.
   * @returns {Promise<BlogPostSanitizedResponse[]>} - A list of sanitized blog posts.
   * @throws {PostDoesNotExist} - If no posts exist.
   */
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

  /**
   * Retrieves a blog post by its ID.
   *
   * @param {string} id - The ID of the blog post.
   * @returns {Promise<BlogPostSanitizedResponse>} - The sanitized blog post.
   * @throws {PostIdValidationError} - If the provided ID is not valid.
   * @throws {PostDoesNotExist} - If no post with the given ID exists.
   */
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

  /**
   * Deletes a blog post by its ID.
   *
   * @param {string} id - The ID of the blog post to delete.
   * @param {mongoose.Types.ObjectId} userId - The ID of the user attempting to delete the post.
   * @returns {Promise<number>} - The number of deleted posts (should be 1).
   * @throws {PostIdValidationError} - If the provided ID is not valid.
   * @throws {PostDoesNotExist} - If no post with the given ID exists.
   * @throws {PostInsufficientPermissionsError} - If the user does not have permission to delete the post.
   * @throws {PostError} - If the deletion failed.
   */
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

  /**
   * Retrieves related posts for a given post ID.
   *
   * @param {string} id - The ID of the post for which to retrieve related posts.
   * @returns {Promise<{ relatedPosts: BlogPostDocument[] }>} - An object containing related posts.
   * @throws {PostIdValidationError} - If the provided ID is not valid.
   * @throws {PostDoesNotExist} - If no post with the given ID exists.
   */
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

  /**
   * Creates a relation between two blog posts.
   *
   * @param {string} sourcePostId - The ID of the source post.
   * @param {string} relationPostId - The ID of the post to relate to.
   * @returns {Promise<BlogPostSanitizedResponse | undefined>} - The updated blog post with the new relation.
   * @throws {PostIdValidationError} - If either ID is not valid.
   * @throws {PostCircularRelationship} - If trying to relate the same post.
   * @throws {PostDoesNotExist} - If either post does not exist.
   * @throws {PostRelationConflict} - If the relationship already exists.
   */
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

  /**
   * Retrieves comments for a specific blog post.
   *
   * @param {string} postId - The ID of the post.
   * @returns {Promise<BlogPostComment[]>} - A list of comments associated with the post.
   * @throws {PostIdValidationError} - If the provided ID is not valid.
   * @throws {PostDoesNotExist} - If no post with the given ID exists.
   * @throws {PostDoesNotHaveComments} - If the post has no comments.
   */
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

  /**
   * Adds a comment to a blog post.
   *
   * @param {string} postId - The ID of the post to which the comment will be added.
   * @param {CreateCommentDto} createCommentDto - The data transfer object containing the comment details.
   * @returns {Promise<BlogPostSanitizedResponse>} - The updated blog post with the new comment.
   * @throws {PostIdValidationError} - If the provided ID is not valid.
   * @throws {PostDoesNotExist} - If no post with the given ID exists.
   */
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

  /**
   * Deletes a comment from a blog post.
   *
   * @param {string} postId - The ID of the post from which the comment will be deleted.
   * @param {string} commentId - The ID of the comment to delete.
   * @param {mongoose.Types.ObjectId} userId - The ID of the user attempting to delete the comment.
   * @returns {Promise<{ success: boolean }>} - An object indicating the success of the operation.
   * @throws {PostIdValidationError} - If the provided post ID is not valid.
   * @throws {PostDoesNotExist} - If no post with the given ID exists.
   * @throws {CommentDoesNotExist} - If no comment with the given ID exists.
   * @throws {CommentInsufficientPermissionsError} - If the user does not have permission to delete the comment.
   */
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
