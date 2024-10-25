import { Request } from "express";
import { BlogPostUserDocument } from "@/schemas/user.schema";
import { BlogPost } from "@/schemas/post.schema";

export interface ExpressRequestWithBlogPostUser extends Request {
  user: BlogPostUserDocument;
}

export interface BlogPostSanitizedResponse extends Omit<BlogPost, "createdBy" | "updatedBy"> {
  createdBy: string;
  updatedBy: string;
}
