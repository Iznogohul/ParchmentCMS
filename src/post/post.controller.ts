import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { BlogPost } from "../schemas/post.schema";
import {
  PostCircularRelationship,
  PostDoesntExist,
  PostRelationConflict,
} from "./post.errors";
import { CreateRelationshipDto } from "./dto/create-relationship.dto";

@ApiTags("Post Managment")
@Controller("/api/v1/posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post("")
  @ApiOperation({
    summary: "Create post",
    description: "Get a post",
  })
  @ApiBody({
    type: CreatePostDto,
    description: "The input data to create a new blog post",
    required: true,
    schema: {
      type: "object",
      properties: {
        title: {
          description: "Title of the blog post",
          type: "string",
          default: "How to configure Swagger 101",
        },
        content: {
          description: "Content of the blog post",
          type: "string",
          default: "How to configure Swagger 101",
        },
        imagePath: {
          description: "Url of the image of the blog post",
          type: "string",
          default:
            "https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg",
        },
      },
      required: ["status"],
    },
    examples: {
      successExample: {
        value: {
          title: "My new blog post",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          imagePath:
            "https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg",
        },
        description: "Example blog post data",
      },
      failExample: {
        value: {
          title: "My new blog post",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          imagePath: "",
        },
        description: "Example blog post data",
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "Indicates, the request was successful.",
  })
  @ApiResponse({
    status: 409,
    description: "Indicates, the post already exists.",
  })
  @ApiResponse({ status: 500, description: "Indicates, the request failed." })
  async create(@Body() createPostDto: CreatePostDto) {
    try {
      const result = await this.postService.createBlogPost(createPostDto);
      return result;
    } catch (error) {
      if (error instanceof PostRelationConflict) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      } else if (error instanceof PostDoesntExist) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("")
  @ApiOperation({
    summary: "Get all posts",
    description: "Get all posts",
  })
  @ApiQuery({
    name: "page",
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: "limit",
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: "slug",
    type: String,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: "Indicates, the request was successful.",
  })
  @ApiResponse({
    status: 404,
    description: "Indicates, that the are no posts.",
  })
  @ApiResponse({ status: 500, description: "Indicates, the request failed." })
  async getPosts(
    @Query("page") page?: number,
    @Query("limit") limit?: number,
    @Query("slug") slug?: string
  ): Promise<BlogPost | BlogPost[]> {
    try {
      if (page !== undefined && limit !== undefined) {
        const posts = await this.postService.getPostsByPagination(page, limit);
        return posts;
      }
      if (slug !== undefined) {
        const post = await this.postService.getPostBySlug(slug);
        return post;
      }
      const posts = await this.postService.getAllPosts();
      return posts;
    } catch (error) {
      if (error instanceof PostRelationConflict) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      } else if (error instanceof PostDoesntExist) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Get post",
    description: "Get a post based on the id",
    operationId: "getPost",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        description: "The id of the post",
      },
    ],
  })
  @ApiResponse({
    status: 200,
    description: "Indicates, the request was successful.",
  })
  @ApiResponse({
    status: 404,
    description: "Indicates, the post doesnt exist.",
  })
  @ApiResponse({ status: 500, description: "Indicates, the request failed." })
  async getPostById(@Param("id") id: string): Promise<BlogPost> {
    try {
      const post = await this.postService.getPostById(id);
      return post;
    } catch (error) {
      if (error instanceof PostDoesntExist) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete("/:id")
  @ApiOperation({
    summary: "Delete post",
    description: "Delete a post based on the id",
    operationId: "deletePost",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "ID of post to delete",
        required: true,
      },
    ],
  })
  @ApiResponse({
    status: 200,
    description: "Indicates, the request was successful.",
  })
  @ApiResponse({
    status: 404,
    description: "Indicates, the post doesnt exist.",
  })
  @ApiResponse({ status: 500, description: "Indicates, the request failed." })
  async deletePost(@Param("id") id: string): Promise<{ result: string }> {
    try {
      await this.postService.deletePost(id);
      return { result: "success" };
    } catch (error) {
      if (error instanceof PostDoesntExist) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/:id/relations")
  @ApiOperation({
    summary: "Post Relationships",
    parameters: [
      {
        in: "query",
        name: "sourcePostId",
        required: true,
        description: "sourcePostId to use",
      },
    ],
    description: "Get Relationships of a post",
  })
  @ApiResponse({
    status: 200,
    description: "Indicates, the request was successful.",
  })
  @ApiResponse({
    status: 404,
    description: "Indicates, the post doesnt exist.",
  })
  @ApiResponse({
    status: 500,
    description: "Indicates, the request failed.",
  })
  async getRelatedPosts(@Param("id") id: string) {
    try {
      const post = await this.postService.getRelatedPosts(id);
      return { relatedPosts: post.relatedPosts };
    } catch (error) {
      if (error instanceof PostDoesntExist) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("/relation/")
  @ApiOperation({
    summary: "Set Post Relationship",
    parameters: [
      {
        in: "query",
        name: "sourcePostId",
        required: true,
        description: "sourcePostId to use",
      },
      {
        in: "query",
        name: "relationPostId",
        required: true,

        description: "relationPostId to use",
      },
    ],
    description: "Set Relationship between two posts",
  })
  @ApiResponse({
    status: 201,
    description: "Indicates, the request was successful.",
  })
  @ApiResponse({
    status: 400,
    description: "Indicates, the request failed.",
  })
  @ApiResponse({
    status: 404,
    description: "Indicates, the post doesnt exist.",
  })
  @ApiResponse({
    status: 409,
    description: "Indicates, the relationship already exists.",
  })
  @ApiResponse({
    status: 500,
    description: "Indicates, the request failed.",
  })
  async createRelation(
    @Query() CreateRelationshipDto: CreateRelationshipDto
  ): Promise<{ success: boolean; data: BlogPost } | Error> {
    try {
      const post = await this.postService.createRelation(
        CreateRelationshipDto.sourcePostId,
        CreateRelationshipDto.relationPostId
      );
      return { success: true, data: post };
    } catch (error) {
      if (error instanceof PostRelationConflict) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      } else if (error instanceof PostDoesntExist) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else if (error instanceof PostCircularRelationship) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
