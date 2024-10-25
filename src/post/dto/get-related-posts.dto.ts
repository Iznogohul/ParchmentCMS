import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class GetRelatedPostsDto {
  @ApiProperty({
    description: "The unique identifier of the blog post",
    example: "60f6c2d3a8341c8f0a5865c4",
  })
  @IsMongoId({ message: "Invalid MongoDB ID format" })
  id: string;
}
