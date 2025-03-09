import { PublicAccess } from "../../common/decorators/public-access.decorator";
import { Controller, UseGuards, Post, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @PublicAccess()
  @UseGuards(AuthGuard("local"))
  public async login(@Request() request: any) {
    const accessToken = await this.authService.generateJWT(request.user.email);
    return { status: 1, message: { accessToken } };
  }
}
