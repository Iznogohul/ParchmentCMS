import { BlogPost } from "@/schemas/post.schema";
import { BlogPostSanitizedResponse } from "../interfaces/post.interface";

/**
 * Sanitizes a blog post by keeping only the `username` fields from the `createdBy`
 * and `updatedBy` user objects. All other data in these fields is removed, reducing
 * the amount of exposed user information.
 *
 * @param {BlogPost} post - The blog post to sanitize.
 * @returns {BlogPostSanitizedResponse} - The sanitized blog post, with only `createdBy`
 * and `updatedBy` usernames included.
 */
export function sanitizeBlogPost(post: BlogPost): BlogPostSanitizedResponse {
  return {
    ...post,
    createdBy: post.createdBy?.username || null,
    updatedBy: post.updatedBy?.username || null,
  };
}

/**
 * Sanitizes an array of blog posts by keeping only the `username` fields
 * from each post's `createdBy` and `updatedBy` user objects.
 *
 * @param {BlogPost[]} posts - Array of blog posts to sanitize.
 * @returns {BlogPostSanitizedResponse[]} - Array of sanitized blog posts, each with
 * only `createdBy` and `updatedBy` usernames included.
 */
export function sanitizeBlogPosts(posts: BlogPost[]): BlogPostSanitizedResponse[] {
  return posts.map(post => sanitizeBlogPost(post));
}
