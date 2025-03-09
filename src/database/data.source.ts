import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { DataSourceOptions, DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const DATA_SOURCE_CONFIG: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + "../../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
  synchronize: false,
  migrationsRun: false,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export const APP_DS = new DataSource(DATA_SOURCE_CONFIG);
