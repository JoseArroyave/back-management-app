import { UsersService } from "../../modules/users/users.service";
import { IUsers } from "../../modules/users/users.interface";
import { IPayloadToken } from "./auth.interface";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

  public async validateUser(username: string, password: string): Promise<Partial<IUsers>> {
    const user = await this.validateIfUserExists(username);
    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    return user;
  }

  public async validateIfUserExists(value: string): Promise<IUsers | null> {
    return (await this.usersService.findBy({ key: "email", value })).message ?? null;
  }

  public async generateJWT(username: string): Promise<string> {
    const user = (await this.usersService.findBy({ key: "email", value: username })).message;

    delete user.password;

    const payload: IPayloadToken = { user, sub: user.idUser };
    const token = await this.signJwt(payload);

    return token;
  }

  public async signJwt(payload: IPayloadToken): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
