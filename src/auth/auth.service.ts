import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserService } from "../user/user.service";

import { LoginUserDto } from "./dto/login-user.dto";

/**
 * Service for handling user authentication, including login and token generation.
 *
 * @class AuthService
 */
@Injectable()
export class AuthService {
  /**
   * Creates an instance of AuthService.
   *
   * @param {UserService} userService - Service for user-related operations.
   * @param {JwtService} jwtService - Service for generating and verifying JWT tokens.
   */
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Authenticates a user based on login credentials and generates a JWT access token.
   *
   * @param {LoginUserDto} loginUserDto - Data transfer object containing the user's login credentials (username and password).
   * @returns {Promise<{ accessToken: string }>} A promise that resolves to an object containing the generated JWT access token.
   * @throws {UnauthorizedException} When the credentials are invalid or the user cannot be validated.
   * @method login
   */
  public async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.userService.validateUser(loginUserDto);
    const payload = { username: user.username, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
