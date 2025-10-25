import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

/**
 * Data Transfer Object for creating a relationship between two blog posts.
 *
 * This class defines the structure and validation rules for the data needed
 * to establish a relationship between a source post and a related post.
 * It includes the unique identifiers for both posts, ensuring that the
 * necessary validation checks are performed.
 */
export class CreateRelationshipDto {
  /**
   * The ID of the source blog post.
   *
   * This ID should correspond to an existing blog post that serves
   * as the reference for the relationship.
   *
   * @example "60f72b2f9b1e8d001c8f4e80"
   * @remarks This property must not be empty and must be a valid string.
   */
  @IsNotEmpty({ message: "Source post ID must not be empty." })
  @IsString({ message: "Source post ID must be a string." })
  @ApiProperty({
    description: "The ID of the source blog post.",
    example: "60f72b2f9b1e8d001c8f4e80",
  })
  sourcePostId: string;

  /**
   * The ID of the related blog post.
   *
   * This ID should correspond to an existing blog post that will be
   * linked to the source post, establishing a relationship between the two.
   *
   * @example "60f72b2f9b1e8d001c8f4e81"
   * @remarks This property must not be empty and must be a valid string.
   */
  @IsNotEmpty({ message: "Related post ID must not be empty." })
  @IsString({ message: "Related post ID must be a string." })
  @ApiProperty({
    description: "The ID of the related blog post.",
    example: "60f72b2f9b1e8d001c8f4e81",
  })
  relationPostId: string;
}
