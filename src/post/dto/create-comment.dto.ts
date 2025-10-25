import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

/**
 * Data Transfer Object for creating a comment.
 *
 * This class is used to define the structure of the data
 * required to create a comment, including validation rules.
 */
export class CreateCommentDto {
  /**
   * The name of the author of the comment.
   * Must be a non-empty string.
   */
  @ApiProperty({
    description: "The name of the author of the comment.",
    example: "John Doe",
  })
  @IsString({ message: "Author must be a string." })
  @IsNotEmpty({ message: "Author cannot be empty." })
  author: string;

  /**
   * The content of the comment.
   * Must be a non-empty string.
   */
  @ApiProperty({
    description: "The content of the comment.",
    example: "Great post! Really enjoyed reading it.",
  })
  @IsString({ message: "Content must be a string." })
  @IsNotEmpty({ message: "Content cannot be empty." })
  content: string;
}
