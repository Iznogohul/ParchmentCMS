import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { BlogPost, BlogPostSchema } from "../schemas/post.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: BlogPost.name, schema: BlogPostSchema }])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
