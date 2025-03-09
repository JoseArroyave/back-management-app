import { UsersModule } from "./users/users.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [UsersModule],
  exports: [UsersModule],
})
export class ModulesModule {}
