import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { hasUsernameOrEmail } from "../decorators/hasUsernameOrEmail.decorator";

/**
 * @class LoginUserDto
 * @description Data transfer object for user login credentials.
 * This DTO requires either a username or an email and a password to authenticate a user.
 */
export class LoginUserDto {
  /**
   * @property {string} [username]
   * @description Username for the user account. Provide either username or email.
   * @example "john_doe"
   * @optional
   */
  @ApiProperty({
    description: "Username for the user account. Provide either username or email.",
    example: "john_doe",
  })
  @IsString()
  @IsOptional()
  username?: string;

  /**
   * @property {string} [email]
   * @description Email for the user account. Provide either username or email.
   * @example "john_doe@example.com"
   * @optional
   */
  @ApiProperty({
    description: "Email for the user account. Provide either username or email.",
    example: "john_doe@example.com",
  })
  @IsString()
  @IsOptional()
  email?: string;

  /**
   * @property {string} password
   * @description Password for the user account. This field is required for authentication.
   * @example "StrongP@ssw0rd!"
   * @required
   */
  @ApiProperty({
    description: "Password for the user account",
    example: "StrongP@ssw0rd!",
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  /**
   * @property {string} [_hasUsernameOrEmail]
   * @description Custom validation decorator to ensure either username or email must be provided.
   * This is an internal property for validation logic and should not be set directly by the user.
   * @optional
   */
  @hasUsernameOrEmail({
    message: "Either username or email must be provided.",
  })
  _hasUsernameOrEmail?: string;
}
