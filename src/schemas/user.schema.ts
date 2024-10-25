import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class BlogPostUser {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(BlogPostUser);

export type BlogPostUserDocument = HydratedDocument<BlogPostUser>;
export const BlogPostUserSchema = SchemaFactory.createForClass(BlogPostUser);
