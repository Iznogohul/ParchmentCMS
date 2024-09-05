import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema({ timestamps: true })
export class BlogPostComment {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: () => new Date() })
  date: Date;
}

export type BlogPostCommentDocument = HydratedDocument<BlogPostComment>;
export const BlogPostCommentSchema = SchemaFactory.createForClass(BlogPostComment);
