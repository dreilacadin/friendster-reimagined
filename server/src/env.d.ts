declare namespace NodeJS {
  export interface ProcessEnv {
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_NO_SYNC: string;
    DB_NO_LOGS: string;
    PORT: string;
    CORS_ORIGIN: string;
    REDIS_URL: string;
    SESSION_SECRET: string;
  }
}
