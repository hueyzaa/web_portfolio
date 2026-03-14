import { registerAs } from '@nestjs/config';

export const envConfig = registerAs('env', () => ({
  port: Number(process.env.PORT) || 9998,

  database: {
    type: 'mysql',
    host: process.env.CORE_DATABASE_HOST || 'localhost',
    port: Number(process.env.CORE_DATABASE_PORT) || 3306,
    username: process.env.CORE_DATABASE_USER || 'root',
    password: process.env.CORE_DATABASE_PASS || '123456',
    database: process.env.CORE_DATABASE_NAME || 'web_portfolio',
    autoLoadEntities: true,
    synchronize: process.env.CORE_DATABASE_SYNC === '1',
  },

  system_name: process.env.CORE_SYSTEM_NAME || 'Web Portfolio',
  system_frontend_url:
    process.env.CORE_SYSTEM_FRONTEND_URL || 'http://localhost:3000',
  jwt_secret_key: process.env.CORE_JWT_SECRET_KEY || 'default_secret_key',
  jwt_expires_time: process.env.CORE_EXPIRES_TIME || '1d',
  upload_dir: process.env.CORE_UPLOAD_DIR || 'uploads/projects',
}));
