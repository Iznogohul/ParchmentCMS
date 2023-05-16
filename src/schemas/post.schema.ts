import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true })
export class BlogPost {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  imagePath: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, default: new Date() })
  date: Date;

  @Prop()
  slug: string;

  @Prop()
  relatedPosts: Array<BlogPost> = [];
}

export type BlogPostDocument = HydratedDocument<BlogPost>;

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);

function generateSlug(blogPostTitle: string) {
  const slug = blogPostTitle.toLowerCase().replace(/[^a-z0-9]/g, "-");

  return slug.replace(/^-|-$/g, "");
}
BlogPostSchema.pre<BlogPost>("save", function (next) {
  this.slug = generateSlug(this.title);
  next();
});
