import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({
    description: "The new name of the user",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
