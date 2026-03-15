import { registerAs } from '@nestjs/config';

export const envConfig = registerAs('env', () => ({
  node_env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 9999,

  database: {
    type: 'mysql',
    host: process.env.DB_HOST || process.env.CORE_DATABASE_HOST || 'localhost',
    port: Number(process.env.DB_PORT || process.env.CORE_DATABASE_PORT) || 3306,
    username: process.env.DB_USER || process.env.CORE_DATABASE_USER || 'root',
    password:
      process.env.DB_PASSWORD || process.env.CORE_DATABASE_PASS || '123456',
    database:
      process.env.DB_NAME || process.env.CORE_DATABASE_NAME || 'web_portfolio',
    autoLoadEntities: true,
    synchronize: process.env.NODE_ENV === 'development',
  },

  system_name:
    process.env.VITE_WEB_NAME ||
    process.env.CORE_SYSTEM_NAME ||
    'Web Portfolio',
  cors_origin:
    process.env.CORS_ORIGIN || process.env.CORE_SYSTEM_FRONTEND_URL || '*',
  jwt_secret_key:
    process.env.CORE_JWT_SECRET_KEY || 'web_portfolio_secret_key_2026',
  jwt_expires_time: process.env.CORE_EXPIRES_TIME || '1d',
  upload_path:
    process.env.UPLOAD_PATH || process.env.CORE_UPLOAD_DIR || 'uploads',
}));
