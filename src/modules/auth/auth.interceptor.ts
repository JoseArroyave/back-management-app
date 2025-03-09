import { ExecutionContext, NestInterceptor, CallHandler, Injectable } from "@nestjs/common";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PUBLIC_KEY } from "../../common/constants/key-decorators";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Request } from "express";

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private jwtStrategy: JwtStrategy
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());
    if (isPublic) return next.handle();

    const request = context.switchToHttp().getRequest<Request>();

    const token = request.headers.authorization;
    const decodedToken = this.jwtStrategy.decodeToken(token).decodedToken;

    request.session = decodedToken;

    return next.handle();
  }
}
