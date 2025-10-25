import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { BlogPostUserSchema, BlogPostUser } from "../schemas/user.schema";

import { UserService } from "./user.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: BlogPostUser.name, schema: BlogPostUserSchema }])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
