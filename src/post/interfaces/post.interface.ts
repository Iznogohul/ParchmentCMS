import { Request } from "express";

import { BlogPost } from "@/schemas/post.schema";
import { BlogPostUserDocument } from "@/schemas/user.schema";

/**
 * Extends the Express Request object to include the authenticated user's information.
 *
 * @interface ExpressRequestWithBlogPostUser
 */
export interface ExpressRequestWithBlogPostUser extends Request {
  /**
   * The user associated with the request, represented as a BlogPostUserDocument.
   *
   * @type {BlogPostUserDocument}
   */
  user: BlogPostUserDocument;
}

/**
 * Represents a sanitized response for a blog post, excluding sensitive user information.
 *
 * @interface BlogPostSanitizedResponse
 * @extends {BlogPost} - This type extends the BlogPost schema but omits the createdBy and updatedBy fields.
 */
export interface BlogPostSanitizedResponse extends Omit<BlogPost, "createdBy" | "updatedBy"> {
  /**
   * The username of the user who created the blog post.
   *
   * @type {string}
   */
  createdBy: string;

  /**
   * The username of the user who last updated the blog post.
   *
   * @type {string}
   */
  updatedBy: string;
}

/**
 * Represents the HTTP response format for a created blog post.
 *
 * @interface CreatedBlogPostResponse
 */
export interface CreatedBlogPostResponse {
  /**
   * The result of the creation process (e.g., success or failure).
   *
   * @type {string}
   */
  result: string;

  /**
   * The title of the created blog post.
   *
   * @type {string}
   */
  title: string;

  /**
   * The content of the created blog post.
   *
   * @type {string}
   */
  content: string;

  /**
   * The path to the image associated with the blog post.
   *
   * @type {string}
   */
  imagePath: string;
}
