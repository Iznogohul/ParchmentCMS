import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

import { BlogPostComment, BlogPostCommentSchema } from "./comment.schema";
import slugify from "slugify";

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
  relatedPosts: BlogPost[];

  @Prop({ type: [BlogPostCommentSchema], default: [] })
  comments: BlogPostComment[];
}

export type BlogPostDocument = HydratedDocument<BlogPost>;

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);

function generateSlug(blogPostTitle: string): string {
  return slugify(blogPostTitle, { lower: true, strict: true });
}

BlogPostSchema.pre<BlogPost>("save", function (next) {
  if (!this.slug) {
    this.slug = generateSlug(this.title);
  }
  next();
});
