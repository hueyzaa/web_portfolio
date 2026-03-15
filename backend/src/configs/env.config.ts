import { registerAs } from '@nestjs/config';

interface DatabaseConfig {
  type: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
  url?: string;
  autoLoadEntities: boolean;
  synchronize: boolean;
}

export const envConfig = registerAs('env', () => {
  const databaseUrl =
    process.env.MYSQL_PUBLIC_URL ||
    process.env.DATABASE_URL ||
    process.env.MYSQL_URL;

  const dbConfig: DatabaseConfig = {
    type: 'mysql',
    host:
      process.env.DB_HOST ||
      process.env.CORE_DATABASE_HOST ||
      process.env.MYSQLHOST ||
      'localhost',
    port:
      Number(
        process.env.DB_PORT ||
          process.env.CORE_DATABASE_PORT ||
          process.env.MYSQLPORT,
      ) || 3306,
    username:
      process.env.DB_USER ||
      process.env.CORE_DATABASE_USER ||
      process.env.MYSQLUSER ||
      'root',
    password:
      process.env.DB_PASSWORD ||
      process.env.CORE_DATABASE_PASS ||
      process.env.MYSQLPASSWORD ||
      '123456',
    database:
      process.env.DB_NAME ||
      process.env.CORE_DATABASE_NAME ||
      process.env.MYSQLDATABASE ||
      'web_portfolio',
    autoLoadEntities: true,
    synchronize: process.env.NODE_ENV === 'development',
  };

  if (databaseUrl) {
    dbConfig.url = databaseUrl;
  }

  console.log('--- Database Config Debug ---');
  if (dbConfig.url) {
    console.log(
      'Using Database URL:',
      dbConfig.url.replace(/:[^:@/]+@/, ':***@'),
    );
  } else {
    console.log('Host:', dbConfig.host);
    console.log('Port:', dbConfig.port);
    console.log('User:', dbConfig.username);
    console.log('Database:', dbConfig.database);
  }
  console.log('-----------------------------');

  return {
    node_env: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 9999,
    database: dbConfig,

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
  };
});
