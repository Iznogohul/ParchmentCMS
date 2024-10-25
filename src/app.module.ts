import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostModule } from "./post/post.module";
import { HealthModule } from "./health/health.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGODB_URI), UserModule, PostModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
