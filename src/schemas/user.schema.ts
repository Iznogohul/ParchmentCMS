import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

/**
 * Represents a user in the blog post system.
 *
 * The BlogPostUser schema defines the structure of the user documents stored in MongoDB,
 * including properties for username, password, email, and name.
 */
@Schema()
export class BlogPostUser {
  /** The unique username for the user. */
  @Prop({ required: true, unique: true })
  username: string;

  /** The hashed password for the user. */
  @Prop({ required: true })
  password: string;

  /** The unique email address for the user. */
  @Prop({ required: true, unique: true })
  email: string;

  /** The name of the user. */
  @Prop({ required: true })
  name: string;
}

/**
 * The Mongoose schema for the BlogPostUser.
 * This schema is used to create and manage user documents in the MongoDB database.
 */
export const UserSchema = SchemaFactory.createForClass(BlogPostUser);

/**
 * The type representing a hydrated BlogPostUser document.
 * This type is used to work with user documents retrieved from MongoDB.
 */
export type BlogPostUserDocument = HydratedDocument<BlogPostUser>;

/**
 * The Mongoose schema definition for BlogPostUser.
 * This can be used in module imports to register the user schema with Mongoose.
 */
export const BlogPostUserSchema = SchemaFactory.createForClass(BlogPostUser);
