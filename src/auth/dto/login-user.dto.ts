import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { hasUsernameOrEmail } from "../decorators/hasUsernameOrEmail.decorator";
export class LoginUserDto {
  @ApiProperty({
    description: "Username for the user account. Provide either username or email.",
    example: "john_doe",
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: "Email for the user account. Provide either username or email.",
    example: "john_doe@example.com",
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: "Password for the user account",
    example: "StrongP@ssw0rd!",
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @hasUsernameOrEmail({
    message: "Either username or email must be provided.",
  })
  _hasUsernameOrEmail?: string;
}
