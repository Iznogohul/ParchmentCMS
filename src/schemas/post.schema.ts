import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import slugify from "slugify";

import { BlogPostComment, BlogPostCommentSchema } from "./comment.schema";
import { BlogPostUser, BlogPostUserDocument } from "./user.schema";

@Schema({ timestamps: true })
export class BlogPost {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  imagePath: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, default: () => new Date() })
  date: Date;

  @Prop({ unique: true, index: true })
  slug: string;

  @Prop({ type: [{ type: "ObjectId", ref: "BlogPost" }] })
  relatedPosts: BlogPostDocument[];

  @Prop({ type: [BlogPostCommentSchema], default: [] })
  comments: BlogPostComment[];

  @Prop({ type: "ObjectId", ref: BlogPostUser.name, required: true })
  createdBy: BlogPostUserDocument;

  @Prop({ type: "ObjectId", ref: BlogPostUser.name })
  updatedBy: BlogPostUserDocument;
}

export type BlogPostDocument = HydratedDocument<BlogPost>;

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);

function generateSlug(blogPostTitle: string): string {
  return slugify(blogPostTitle, { lower: true, strict: true });
}

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
