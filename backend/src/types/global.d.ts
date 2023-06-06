
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGO_URI: string;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      REFRESH_COOKIE_NAME: string;
      ACTIVATE_REDIRECT_LINK: string;
      SALT: string;
      MAIL_SERVICE: string;
      MAIL_USERNAME: string;
      MAIL_PASSWORD: string;
    }
  }
}

export {};
