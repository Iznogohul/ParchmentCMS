import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import slugify from "slugify";

import { BlogPostComment, BlogPostCommentSchema } from "./comment.schema";
import { BlogPostUser, BlogPostUserDocument } from "./user.schema";

/**
 * Represents a blog post in the system.
 *
 * The BlogPost schema defines the structure of blog post documents stored in MongoDB,
 * including properties for title, content, associated users, and comments.
 */
@Schema({ timestamps: true })
export class BlogPost {
  /** The title of the blog post. */
  @Prop({ required: true })
  title: string;

  /** The path to the image associated with the blog post. */
  @Prop({ required: true })
  imagePath: string;

  /** The main content of the blog post. */
  @Prop({ required: true })
  content: string;

  /** The date the blog post was created or updated. Defaults to the current date. */
  @Prop({ required: true, default: () => new Date() })
  date: Date;

  /** The unique slug for the blog post, used for SEO-friendly URLs. */
  @Prop({ unique: true, index: true })
  slug: string;

  /**
   * An array of related blog posts by their ObjectId references.
   * This allows linking to other blog posts within the content.
   */
  @Prop({ type: [{ type: "ObjectId", ref: "BlogPost" }] })
  relatedPosts: BlogPostDocument[];

  /**
   * An array of comments associated with the blog post.
   * Each comment is defined by the BlogPostComment schema.
   */
  @Prop({ type: [BlogPostCommentSchema], default: [] })
  comments: BlogPostComment[];

  /**
   * The user who created the blog post, referenced by their ObjectId.
   * This field is required.
   */
  @Prop({ type: "ObjectId", ref: BlogPostUser.name, required: true })
  createdBy: BlogPostUserDocument;

  /**
   * The user who last updated the blog post, referenced by their ObjectId.
   * This field is optional.
   */
  @Prop({ type: "ObjectId", ref: BlogPostUser.name })
  updatedBy: BlogPostUserDocument;
}

/**
 * The Mongoose document type for BlogPost, representing a hydrated document.
 * This type is used to work with blog post documents retrieved from MongoDB.
 */
export type BlogPostDocument = HydratedDocument<BlogPost>;

/**
 * The Mongoose schema definition for BlogPost.
 * This schema is used to create and manage blog post documents in the MongoDB database.
 */
export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);

/**
 * Generates a slug from the blog post title.
 *
 * @param {string} blogPostTitle - The title of the blog post to generate a slug from.
 * @returns {string} - The generated slug, formatted to be SEO-friendly.
 */
function generateSlug(blogPostTitle: string): string {
  return slugify(blogPostTitle, { lower: true, strict: true });
}

/**
 * Mongoose pre-save hook for the BlogPost schema.
 * Automatically generates a slug from the title if not provided,
 * and sets the updatedBy field to the creator when the post is new.
 */
BlogPostSchema.pre<BlogPostDocument>("save", function (next) {
  const blogPost = this as BlogPostDocument;

  if (!blogPost.slug) {
    blogPost.slug = generateSlug(blogPost.title);
  }

  if (blogPost.isNew) {
    blogPost.updatedBy = blogPost.createdBy;
  }

  next();
});
