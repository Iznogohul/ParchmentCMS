import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { BlogPost, BlogPostSchema } from "../schemas/post.schema";

import { PostController } from "./post.controller";
import { PostService } from "./post.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: BlogPost.name, schema: BlogPostSchema }])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
