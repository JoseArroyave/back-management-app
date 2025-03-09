import { TasksModule } from "./tasks/tasks.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [UsersModule, TasksModule, AuthModule],
  exports: [UsersModule, TasksModule, AuthModule],
})
export class ModulesModule {}
