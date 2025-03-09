declare namespace NodeJS {
  interface ProcessEnv {
    MAIL_TRANSPORT: string;
    DB_CONNECTION: string;
    MAIL_PASSWORD: string;
    DB_DATABASE: string;
    DB_USERNAME: string;
    DB_PASSWOR: string;
    JWT_SECRET: string;
    HASH_SALT: number;
    MAIL_HOST: string;
    MAIL_USER: string;
    MAIL_FROM: string;
    MAIL_PORT: number;
    NODE_ENV: string;
    DB_HOST: string;
    DB_PORT: number;
    PORT: number;
  }
}
