import { BlogPost } from "@/schemas/post.schema";
import { BlogPostSanitizedResponse } from "../interfaces/post.interface";

export function sanitizeBlogPost(post: BlogPost): BlogPostSanitizedResponse {
  return {
    ...post,
    createdBy: post.createdBy?.username || null,
    updatedBy: post.updatedBy?.username || null,
  };
}

export function sanitizeBlogPosts(posts: BlogPost[]): BlogPostSanitizedResponse[] {
  return posts.map(post => sanitizeBlogPost(post));
}
