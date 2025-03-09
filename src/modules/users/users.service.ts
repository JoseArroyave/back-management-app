import { IResponse } from "src/common/interfaces/response.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "./users.entity";
import { Injectable } from "@nestjs/common";
import { IUsers } from "./users.interface";
import { UsersDTO } from "./users.dto";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersEntitiesRepository: Repository<UsersEntity>
  ) {}

  public async createUser(user: UsersDTO): Promise<IResponse<IUsers>> {
    if (user.password) user.password = await bcrypt.hash(user.password, +process.env.HASH_SALT);
    const added = await this.usersEntitiesRepository.save(user);
    return { status: 1, message: added };
  }

  public async findBy({ key, value }: { key: keyof IUsers; value: string }): Promise<IResponse<IUsers>> {
    const user = await this.usersEntitiesRepository
      .createQueryBuilder("users")
      .addSelect("users.password")
      .where(`users.${key} = :value`, { value })
      .getOne();
    return { status: 1, message: user };
  }
}
