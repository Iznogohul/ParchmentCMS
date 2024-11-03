import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

/**
 * Data Transfer Object for retrieving related posts.
 *
 * This class defines the structure and validation rules for the request
 * to get related blog posts based on a given blog post ID. It ensures
 * that the provided ID is a valid MongoDB ObjectId.
 */
export class GetRelatedPostsDto {
  /**
   * The unique identifier of the blog post for which related posts are being requested.
   *
   * @example "60f6c2d3a8341c8f0a5865c4"
   * @remarks This property must be a valid MongoDB ObjectId format.
   */
  @ApiProperty({
    description: "The unique identifier of the blog post for which related posts are being requested.",
    example: "60f6c2d3a8341c8f0a5865c4",
  })
  @IsMongoId({ message: "Invalid MongoDB ID format. Please provide a valid ObjectId." })
  id: string;
}
