import { Body, Controller, Post, UseGuards, Request, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

import { BlogPostUser } from "@/schemas/user.schema";
import { UserService } from "@/user/user.service";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { ExpressRequestWithBlogPostUser } from "@/post/interfaces/post.interface";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiBearerAuth()
@ApiTags("Let Me In!!!")
@Controller("/api/v1/")
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post("register")
  @ApiResponse({
    status: 201,
    description: "User successfully registered.",
    type: BlogPostUser,
  })
  @ApiResponse({
    status: 400,
    description: "Bad Request.",
  })
  @ApiResponse({
    status: 409,
    description: "User with this username or email already exists.",
  })
  async register(@Body() registerUserDto: RegisterUserDto): Promise<Partial<BlogPostUser>> {
    return this.userService.register(registerUserDto);
  }

  @Post("login")
  @ApiResponse({
    status: 201,
    description: "User successfully logged in.",
    schema: {
      example: { accessToken: "jwt.token.here" },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Bad Request.",
  })
  @ApiResponse({
    status: 401,
    description: "Invalid credentials.",
  })
  @ApiResponse({
    status: 404,
    description: "Invalid credentials.",
  })
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put("users/name")
  async updateUserName(@Body() updateUserDto: UpdateUserDto, @Request() req: ExpressRequestWithBlogPostUser): Promise<Partial<BlogPostUser>> {
    return this.userService.updateUserName(req.user._id, updateUserDto);
  }
}
