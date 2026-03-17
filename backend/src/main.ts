// Polyfill crypto for Node versions < 19 where it's not globally available
/* eslint-disable @typescript-eslint/no-require-imports */
if (!global.crypto) {
  try {
    global.crypto =
      (require('crypto') as { webcrypto: Crypto }).webcrypto ||
      (require('crypto') as unknown as Crypto);
  } catch (e) {
    console.error('Failed to polyfill crypto:', e);
  }
}
/* eslint-enable @typescript-eslint/no-require-imports */

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Bulletproof Cache-Control Middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET' || req.method === 'HEAD') {
      const url = req.originalUrl || req.url;
      if (url.includes('/public/projects')) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
      } else if (url.includes('/public/skills')) {
        res.setHeader('Cache-Control', 'public, max-age=600');
      } else if (url.includes('/public/news') || url.includes('/news')) {
        res.setHeader('Cache-Control', 'public, max-age=1800');
      } else if (
        url.includes('/public/profile') ||
        url.includes('/public/settings')
      ) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
      }
    }
    next();
  });

  const configService = app.get(ConfigService);
  const port = process.env.PORT || 9999;
  const corsOrigin = configService.get<string>('env.cors_origin');

  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const uploadPath = configService.get<string>('env.upload_path') || 'uploads';
  // Serve static files from the upload directory
  app.useStaticAssets(join(process.cwd(), uploadPath), {
    prefix: `/${uploadPath}`,
  });

  await app.listen(port || 9999, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port || 9999}`);
  console.log(`External access: http://192.168.1.103:${port || 9999}`);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
