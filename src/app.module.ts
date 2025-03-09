import { DATA_SOURCE_CONFIG } from "./database/data.source";
import { STORAGE_PATH } from "./common/constants/storage";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ModulesModule } from "./modules/modules.module";
import { AuthModule } from "./modules/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DATA_SOURCE_CONFIG,
      retryAttempts: 3,
      cache: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: STORAGE_PATH,
      serveRoot: "/storage",
    }),
    ModulesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
