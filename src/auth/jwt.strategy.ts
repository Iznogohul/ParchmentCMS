import { BlogPostUser } from "@/schemas/user.schema";
import { UserService } from "@/user/user.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

/**
 * Strategy for authenticating users using JSON Web Tokens (JWT).
 * This strategy extracts the JWT from the authorization header and validates it.
 *
 * @class JwtStrategy
 * @extends PassportStrategy
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "JWT Strategy") {
  /**
   * Creates an instance of JwtStrategy.
   *
   * @constructor
   * @param {UserService} userService - Service for retrieving user information from the database.
   */
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * Validates the JWT payload and retrieves the associated user from the database.
   *
   * @method validate
   * @param {{ sub: string; username: string }} payload - The JWT payload containing the user's information.
   * @returns {Promise<BlogPostUser>} A promise that resolves to the authenticated user object.
   * @throws {UnauthorizedException} When the user associated with the JWT is not found.
   */
  public async validate(payload: { sub: string; username: string }): Promise<BlogPostUser> {
    const user = await this.userService.findByUsername(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
