import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserService } from "../user/user.service";
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.userService.validateUser(loginUserDto);
    const payload = { username: user.username, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
