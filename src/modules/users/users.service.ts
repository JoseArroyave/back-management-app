import { IResponse } from "src/common/interfaces/response.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "./users.entity";
import { Injectable } from "@nestjs/common";
import { ILike, Repository } from "typeorm";
import { IUsers } from "./users.interface";
import { UsersDTO } from "./users.dto";
import * as bcrypt from "bcrypt";
import { In } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>
  ) {}

  public async createUser(user: UsersDTO): Promise<IResponse<IUsers>> {
    if (user.password) user.password = await bcrypt.hash(user.password, +process.env.HASH_SALT);
    const added = await this.usersRepository.save(user);
    return { status: 1, message: added };
  }

  public async findBy({ key, value }: { key: keyof IUsers; value: string }): Promise<IResponse<IUsers>> {
    const user = await this.usersRepository
      .createQueryBuilder("users")
      .addSelect("users.password")
      .where(`users.${key} = :value`, { value })
      .getOne();
    return { status: 1, message: user };
  }

  public async findByIds(owners: string[]): Promise<IResponse<IUsers[]>> {
    const users = await this.usersRepository.findBy({ idUser: In(owners) });
    return { status: 1, message: users };
  }

  public async searchUsers(query: string): Promise<IResponse<IUsers[]>> {
    const users = await this.usersRepository.find({
      where: [{ name: ILike(`%${query}%`) }, { email: ILike(`%${query}%`) }],
      select: ["idUser", "name", "email"],
    });
    return { status: 1, message: users };
  }
}
