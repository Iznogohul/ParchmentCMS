import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

/**
 * @class RegisterUserDto
 * @description Data transfer object for user registration credentials.
 * This DTO is used to validate the information provided during user registration.
 */
export class RegisterUserDto {
  /**
   * @property {string} username
   * @description Unique username for the user. This field is required and cannot be empty.
   * @example "john_doe"
   * @required
   */
  @ApiProperty({
    description: "Unique username for the user",
    example: "john_doe",
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  /**
   * @property {string} password
   * @description Password for the user account. Must contain at least one uppercase letter,
   * one lowercase letter, one number, and one special character. This field is required.
   * @example "StrongP@ssw0rd!"
   * @required
   */
  @ApiProperty({
    description: "Password for the user account, must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    example: "StrongP@ssw0rd!",
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 64)
  @Matches(/(?=.*[a-z])/, { message: "Password must contain at least one lowercase letter" })
  @Matches(/(?=.*[A-Z])/, { message: "Password must contain at least one uppercase letter" })
  @Matches(/(?=.*[0-9])/, { message: "Password must contain at least one number" })
  @Matches(/(?=.*[!@#$%^&*])/, { message: "Password must contain at least one special character" })
  password: string;

  /**
   * @property {string} email
   * @description Email address of the user. This field is required and must be a valid email format.
   * @example "john_doe@example.com"
   * @required
   */
  @ApiProperty({
    description: "Email address of the user",
    example: "john_doe@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * @property {string} name
   * @description The user's real or display name. This field is required and cannot be empty.
   * @example "John Doe"
   * @required
   */
  @ApiProperty({
    description: "The user's real or display name",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
