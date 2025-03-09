import { IUseAuthToken, IAuthToken, IPayloadToken } from "../auth.interface";
import { UnauthorizedException, Injectable, Inject } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject()
  private jwtService: JwtService;

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: IPayloadToken) {
    return { idUser: payload.sub, session: payload.session };
  }

  public decodeToken(token: string): IUseAuthToken {
    try {
      const decode = this.jwtService.decode(token.split(" ")[1]) as IAuthToken;
      const expiresDate = new Date(decode.exp);
      const currentDate = new Date();

      return {
        isExpired: +expiresDate <= +currentDate / 1000,
        decodedToken: decode,
      };
    } catch (error) {
      throw new UnauthorizedException("Token is invalid");
    }
  }
}
