import { IsString, IsNotEmpty } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
