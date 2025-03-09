import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { UsersEntity } from "./users.entity";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  exports: [UsersService, TypeOrmModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
