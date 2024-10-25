import { BlogPostUser } from "@/schemas/user.schema";
import { UserService } from "@/user/user.service";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "JWT Strategy") {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: { sub: string; username: string }): Promise<BlogPostUser> {
    const user = await this.userService.findByUsername(payload.username);
    return user;
  }
}
