import { TasksController } from "./tasks.controller";
import { UsersModule } from "../users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksService } from "./tasks.service";
import { TasksEntity } from "./tasks.entity";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity]), UsersModule],
  exports: [TasksService, TypeOrmModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
