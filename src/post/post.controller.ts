import { Controller, Get, Post, Body, Param, Delete, Query, HttpException, HttpStatus, UseGuards, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { BlogPost } from "@/schemas/post.schema";
import {
  PostCircularRelationship,
  PostDoesNotExist,
  PostDoesNotHaveComments,
  PostIdValidationError,
  PostInsufficientPermissionsError,
  PostRelationConflict,
  PostSlugValidationError,
} from "./post.errors";
import { CreateRelationshipDto } from "./dto/create-relationship.dto";
import { CreatedBlogPost } from "./types/post.types";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { BlogPostComment } from "@/schemas/comment.schema";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { BlogPostSanitizedResponse, ExpressRequestWithBlogPostUser } from "./interfaces/post.interface";
import { GetRelatedPostsDto } from "./dto/get-related-posts.dto";

@ApiBearerAuth()
@ApiTags("Post Management")
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
          default: "https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg",
        },
      },
      required: ["status"],
    },
    examples: {
      successExample: {
        value: {
          title: "My new blog post",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          imagePath: "https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg",
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
    status: 401,
    description: "Indicates that the user is not authorized.",
  })
  @ApiResponse({
    status: 409,
    description: "Indicates, the post already exists.",
  })
  @ApiResponse({ status: 500, description: "Indicates, the request failed." })
  @UseGuards(JwtAuthGuard)
  async create(@Body() createPostDto: CreatePostDto, @Request() req: ExpressRequestWithBlogPostUser): Promise<CreatedBlogPost> {
    try {
      const blogPostUser = req.user;
      const result = await this.postService.createBlogPost(createPostDto, blogPostUser._id);
      return result;
    } catch (error) {
      if (error instanceof PostRelationConflict) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      } else if (error instanceof PostDoesNotExist) {
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
    description: "Indicates, that there are no posts.",
  })
  @ApiResponse({
    status: 422,
    description: "Indicates, the query parameters are not valid",
  })
  @ApiResponse({ status: 500, description: "Indicates, the request failed." })
  async getPosts(@Query("page") page?: number, @Query("limit") limit?: number, @Query("slug") slug?: string): Promise<BlogPostSanitizedResponse | BlogPostSanitizedResponse[]> {
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
      } else if (error instanceof PostDoesNotExist) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else if (error instanceof PostSlugValidationError) {
        throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/:id")
  @ApiOperation({
    summary: "Get post",
    description: "Get a post based on the id",
    operationId: "getPost",
  })
  @ApiParam({
    name: "id",
    description: "The id of the post",
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: "Indicates, the request was successful.",
  })
  @ApiResponse({
    status: 404,
    description: "Indicates, the post doesn't exist.",
  })
  @ApiResponse({ status: 500, description: "Indicates, the request failed." })
  async getPostById(@Param("id") id: string): Promise<BlogPostSanitizedResponse> {
    try {
      const post = await this.postService.getPostById(id);
      return post;
    } catch (error) {
      if (error instanceof PostDoesNotExist) {
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
  })
  @ApiParam({
    name: "id",
    description: "ID of post to delete",
    required: true,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: "Indicates, the request was successful.",
  })
  @ApiResponse({
    status: 401,
    description: "Indicates that the user is not authorized.",
  })
  @ApiResponse({
    status: 404,
    description: "Indicates, the post doesn't exist.",
  })
  @ApiResponse({ status: 500, description: "Indicates, the request failed." })
  @UseGuards(JwtAuthGuard)
  async deletePost(@Param("id") id: string, @Request() req: ExpressRequestWithBlogPostUser): Promise<{ result: string }> {
    try {
      const blogPostUser = req.user;
      await this.postService.deletePost(id, blogPostUser._id);
      return { result: "success" };
    } catch (error) {
      if (error instanceof PostDoesNotExist) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else if (error instanceof PostInsufficientPermissionsError) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
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
    status: 400,
    description: "Indicates, the provided post id was invalid",
  })
  @ApiResponse({
    status: 404,
    description: "Indicates, the post doesn't exist.",
  })
  @ApiResponse({
    status: 500,
    description: "Indicates, the request failed.",
  })
  async getRelatedPosts(@Param() getRelatedPostsDto: GetRelatedPostsDto): Promise<{ relatedPosts: BlogPost[] }> {
    try {
      const post = await this.postService.getRelatedPosts(getRelatedPostsDto.id);
      return { relatedPosts: post.relatedPosts };
    } catch (error) {
      if (error instanceof PostDoesNotExist) {
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
    status: 401,
    description: "Indicates that the user is not authorized.",
  })
  @ApiResponse({
    status: 404,
    description: "Indicates, the post doesn't exist.",
  })
  @ApiResponse({
    status: 409,
    description: "Indicates, the relationship already exists.",
  })
  @ApiResponse({
    status: 422,
    description: "Indicates, the query parameters are not valid",
  })
  @ApiResponse({
    status: 500,
    description: "Indicates, the request failed.",
  })
  @UseGuards(JwtAuthGuard)
  async createRelation(@Query() createRelationshipDto: CreateRelationshipDto): Promise<{ success: boolean; data: BlogPostSanitizedResponse } | Error> {
    try {
      const post = await this.postService.createRelation(createRelationshipDto.sourcePostId, createRelationshipDto.relationPostId);
      return { success: true, data: post };
    } catch (error) {
      if (error instanceof PostRelationConflict) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      } else if (error instanceof PostDoesNotExist) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else if (error instanceof PostCircularRelationship) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else if (error instanceof PostIdValidationError) {
        throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/:id/comments")
  @ApiOperation({
    summary: "Get comments for a post",
    description: "Retrieve all comments associated with a specific blog post by its ID",
  })
  @ApiParam({
    name: "id",
    description: "Id of the blog post",
    required: true,
    schema: {
      type: "string",
    },
  })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved comments",
  })
  @ApiResponse({
    status: 400,
    description: "Invalid post ID",
  })
  @ApiResponse({
    status: 404,
    description: "Post not found",
  })
  @ApiResponse({
    status: 500,
    description: "Indicates, the request failed.",
  })
  async getComments(@Param("id") postId: string): Promise<BlogPostComment[]> {
    try {
      const result = await this.postService.getComments(postId);
      return result;
    } catch (error) {
      if (error instanceof PostDoesNotExist || PostDoesNotHaveComments) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else if (error instanceof PostIdValidationError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("/:id/comments")
  @ApiOperation({
    summary: "Add comment to post",
    description: "Add a comment to a blog post",
  })
  @ApiBody({
    type: CreateCommentDto,
    description: "The input data to create a new comment",
    required: true,
    schema: {
      type: "object",
      properties: {
        author: {
          description: "Author of the comment",
          type: "string",
          default: "John Doe",
        },
        content: {
          description: "Content of the comment",
          type: "string",
          default: "Great post!",
        },
      },
      required: ["author", "content"],
    },
    examples: {
      successExample: {
        value: {
          author: "John Doe",
          content: "Great post!",
        },
        description: "Example comment data",
      },
      failExample: {
        value: {
          author: "",
          content: "Great post!",
        },
        description: "Example comment data with missing author",
      },
      failExample2: {
        value: {
          author: "John Doe",
          content: "",
        },
        description: "Example comment data with missing content",
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "Indicates the comment was successfully added.",
  })
  @ApiResponse({
    status: 404,
    description: "Indicates the post was not found.",
  })
  @ApiResponse({ status: 500, description: "Indicates, the request failed." })
  async addComment(@Param("id") postId: string, @Body() createCommentDto: CreateCommentDto): Promise<BlogPostSanitizedResponse> {
    try {
      const result = await this.postService.addComment(postId, createCommentDto);
      return result;
    } catch (error) {
      if (error instanceof PostDoesNotExist) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else if (error instanceof PostIdValidationError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete("/:postId/comments/:commentId")
  @ApiOperation({
    summary: "Delete a comment from a post",
    description: "Remove a specific comment from a blog post by its ID",
  })
  @ApiParam({
    name: "postId",
    description: "ID of the blog post",
    required: true,
    schema: {
      type: "string",
    },
  })
  @ApiParam({
    name: "commentId",
    description: "ID of the comment to be deleted",
    required: true,
    schema: {
      type: "string",
    },
  })
  @ApiResponse({
    status: 200,
    description: "Successfully deleted comment",
  })
  @ApiResponse({
    status: 400,
    description: "Invalid post or comment id",
  })
  @ApiResponse({
    status: 401,
    description: "Indicates that the user is not authorized.",
  })
  @ApiResponse({
    status: 404,
    description: "Post or comment not found",
  })
  @ApiResponse({ status: 500, description: "Indicates, the request failed." })
  @UseGuards(JwtAuthGuard)
  async deleteComment(
    @Param("postId") postId: string,
    @Param("commentId") commentId: string,
    @Request() req: ExpressRequestWithBlogPostUser,
  ): Promise<{
    success: boolean;
  }> {
    try {
      const blogPostUser = req.user;
      const result = await this.postService.deleteComment(postId, commentId, blogPostUser._id);
      return result;
    } catch (error) {
      if (error instanceof PostDoesNotExist) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      } else if (error instanceof PostIdValidationError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
