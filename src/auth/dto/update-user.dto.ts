import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * @class UpdateUserDto
 * @description Data transfer object for updating user information.
 * This DTO is used to validate the new details provided for a user's profile update.
 */
export class UpdateUserDto {
  /**
   * @property {string} name
   * @description The new name of the user. This field is required and cannot be empty.
   * @example "John Doe"
   * @required
   */
  @ApiProperty({
    description: "The new name of the user",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
