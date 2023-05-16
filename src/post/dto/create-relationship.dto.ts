import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRelationshipDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  sourcePostId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  relationPostId: string;
}
