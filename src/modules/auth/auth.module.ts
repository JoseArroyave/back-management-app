import { UsersModule } from "../../modules/users/users.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: "8h" },
      secret: process.env.JWT_SECRET,
      global: true,
    }),
    UsersModule,
  ],
  providers: [LocalStrategy, AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
