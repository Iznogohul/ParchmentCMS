import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class RegisterUserDto {
  @ApiProperty({
    description: "Unique username for the user",
    example: "john_doe",
  })
  @IsString()
  @IsNotEmpty()
  username: string;

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

  @ApiProperty({
    description: "Email address of the user",
    example: "john_doe@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "The user's real or display name",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
