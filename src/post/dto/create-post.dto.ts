import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

/**
 * Data Transfer Object for creating a new blog post.
 *
 * This class defines the structure and validation rules for the
 * data needed to create a new blog post in the application.
 */
export class CreatePostDto {
  /**
   * The title of the blog post.
   *
   * @type {string}
   * @example "My new blog post"
   */
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "The title of the blog post",
    example: "My new blog post",
  })
  title: string;

  /**
   * The content of the blog post.
   *
   * @type {string}
   * @example "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
   */
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "The content of the blog post",
    example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  })
  content: string;

  /**
   * The image path for the blog post.
   *
   * @type {string}
   * @example "/images/my-new-post.jpg"
   */
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "The image path for the blog post",
    example: "/images/my-new-post.jpg",
  })
  imagePath: string;
}
