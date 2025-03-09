declare namespace NodeJS {
  interface ProcessEnv {
    DB_CONNECTION: string;
    DB_DATABASE: string;
    DB_USERNAME: string;
    DB_PASSWOR: string;
    JWT_SECRET: string;
    HASH_SALT: number;
    NODE_ENV: string;
    DB_HOST: string;
    DB_PORT: number;
    PORT: number;
  }
}
