import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * @class JwtAuthGuard
 * @extends AuthGuard
 * @description Guard for protecting routes using JWT authentication.
 * This guard uses the Passport JWT strategy to authenticate requests.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard("JWT Strategy") {}
