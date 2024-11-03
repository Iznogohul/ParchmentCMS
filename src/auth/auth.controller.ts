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

/**
 * Controller for user authentication and management, including registration and login.
 *
 * @class AuthController
 */
@ApiBearerAuth()
@ApiTags("Authentication")
@Controller("/api/v1/")
export class AuthController {
  /**
   * Creates an instance of AuthController.
   *
   * @param {AuthService} authService - Service for handling authentication logic.
   * @param {UserService} userService - Service for user-related operations.
   */
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /**
   * Registers a new user.
   *
   * @param {RegisterUserDto} registerUserDto - Data transfer object containing registration information.
   * @returns {Promise<Partial<BlogPostUser>>} A promise that resolves to the newly registered user's data.
   * @throws {BadRequestException} When the request data is invalid.
   * @throws {ConflictException} When a user with the same username or email already exists.
   * @method register
   */
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

  /**
   * Authenticates a user and returns a JWT token.
   *
   * @param {LoginUserDto} loginUserDto - Data transfer object containing login credentials.
   * @returns {Promise<{ accessToken: string }>} A promise that resolves to an object containing the access token.
   * @throws {BadRequestException} When the request data is invalid.
   * @throws {UnauthorizedException} When the credentials are invalid.
   * @throws {NotFoundException} When the user is not found.
   * @method login
   */
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
    description: "User not found.",
  })
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginUserDto);
  }

  /**
   * Updates the user's name.
   *
   * @param {UpdateUserDto} updateUserDto - Data transfer object containing the new username information.
   * @param {ExpressRequestWithBlogPostUser} req - The request object, which includes the authenticated user data.
   * @returns {Promise<Partial<BlogPostUser>>} A promise that resolves to the updated user's data.
   * @throws {ForbiddenException} When the user is not authorized to update the name.
   * @method updateUserName
   */
  @UseGuards(JwtAuthGuard)
  @Put("users/name")
  async updateUserName(@Body() updateUserDto: UpdateUserDto, @Request() req: ExpressRequestWithBlogPostUser): Promise<Partial<BlogPostUser>> {
    return this.userService.updateUserName(req.user._id, updateUserDto);
  }
}
