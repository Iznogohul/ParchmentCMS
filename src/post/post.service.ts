import { Body, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { plainToClass } from "class-transformer";
import { CreatePostDto } from "./dto/create-post.dto";
import { BlogPost, BlogPostDocument } from "../schemas/post.schema";
import {
  PostRelationConflict,
  PostDoesntExist,
  PostError,
  PostCircularRelationship,
  PostSlugValidationError,
  PostIdValidationError,
} from "./post.errors";

@Injectable()
export class PostService {
  constructor(
    @InjectModel(BlogPost.name) private BlogPostModel: Model<BlogPost>
  ) {}

  async createBlogPost(@Body() createPostDto: CreatePostDto) {
    const post = plainToClass(BlogPost, createPostDto);
    const existingPost = await this.BlogPostModel.findOne({
      title: post.title,
    });
    if (existingPost) {
      throw new PostRelationConflict(
        `Post with title \"${post.title}\" already exists.`
      );
    }
    const savedPost = await new this.BlogPostModel(post).save();
    return {
      result: "success",
      title: savedPost.title,
      content: savedPost.content,
      imagePath: savedPost.imagePath,
    };
  }

  async getAllPosts(): Promise<BlogPost[]> {
    const posts = await this.BlogPostModel.find().select("-__v").exec();
    if (posts.length > 0) {
      return posts;
    }
    throw new PostDoesntExist("Posts are empty!");
  }

  async getPostBySlug(slug: string): Promise<BlogPost> {
    const isSlugValid = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(slug);
    if (isSlugValid === true) {
      const post = await this.BlogPostModel.findOne({ slug: { $eq: slug } })
        .select("-__v -_id")
        .exec();
      if (post) {
        return post;
      }
      throw new PostDoesntExist(`Post with slug \"${slug}\" doesn't exist.`);
    } else {
      throw new PostSlugValidationError("Provided slug is not valid");
    }
  }

  async getPostsByPagination(page: number, limit: number): Promise<BlogPost[]> {
    const skip = page * limit;
    return this.BlogPostModel.find()
      .skip(skip)
      .limit(limit)
      .sort("-createdAt")
      .select("-__v -_id")
      .exec();
  }

  async getPostById(id: string): Promise<BlogPost | undefined> {
    try {
      const post = await this.BlogPostModel.findOne({ _id: id }).select(
        "-__v -_id"
      );
      if (post) {
        return post;
      }
      throw new PostDoesntExist(`Post with id \"${id}\" doesn't exist.`);
    } catch (error) {
      throw new PostDoesntExist(`Post with id \"${id}\" doesn't exist.`);
    }
  }

  async deletePost(id: string) {
    try {
      const result = await this.BlogPostModel.deleteOne({ _id: id }).exec();
      if (result.deletedCount === 0) {
        throw new PostError(`Didnt delete post with \"${id}\" .`);
      }
      return result.deletedCount;
    } catch (err) {
      throw new PostDoesntExist(`Post with id \"${id}\" doesn't exist.`);
    }
  }

  async getRelatedPosts(id: string): Promise<any> {
    try {
      const post = await this.BlogPostModel.findOne({ _id: id });
      return { relatedPosts: post.relatedPosts };
    } catch (error) {
      throw new PostDoesntExist(`Post with id \"${id}\" doesn't exist.`);
    }
  }

  async createRelation(
    sourcePostId: string,
    relationPostId: string
  ): Promise<BlogPost | null> {
    if (!mongoose.Types.ObjectId.isValid(sourcePostId)) {
      throw new PostIdValidationError("Provided sourcePostId is not valid");
    }
    if (!mongoose.Types.ObjectId.isValid(relationPostId)) {
      throw new PostIdValidationError("Provided relationPostId is not valid");
    }
    if (sourcePostId === relationPostId) {
      throw new PostCircularRelationship(
        "Can't make a relation using only one post"
      );
    }

    let sourcePost: BlogPostDocument;
    let relationPost: BlogPostDocument;

    sourcePost = await this.BlogPostModel.findOne({ _id: sourcePostId });
    if (!sourcePost) {
      throw new PostDoesntExist(
        "Post doesn't exist cant create a relationship with other Post"
      );
    }

    relationPost = await this.BlogPostModel.findOne({
      _id: relationPostId,
    });
    if (!relationPost) {
      throw new PostDoesntExist(
        "Relationship Post doesn't exist cant create a relationship with Post."
      );
    }

    relationPost.relatedPosts = undefined;

    const index = sourcePost.relatedPosts.findIndex(
      (relation) => relation.slug === relationPost.slug
    );

    if (index === -1) {
      sourcePost.relatedPosts.push(relationPost);
      const updatedPost = await sourcePost.save();
      return updatedPost;
    }
    throw new PostRelationConflict(
      "Relationship between posts already exists!"
    );
  }
}
