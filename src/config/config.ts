import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '../../.env') });

const config = {
  database: {
    mysql: {
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT ?? ""),
      database: process.env.MYSQL_DB,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    },
  },
  jwtSecrets: {
    jwtSecret: process.env.JWTSECRET,
    accessTokenExpiration: process.env.ACCESSTOKENEXPIRATION,
    refreshTokenExpiration: process.env.REFRESHTOKENEXPIRATION,
  },
  PORT: process.env.PORT,
};

export default config;