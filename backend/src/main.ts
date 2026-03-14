import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('env.port');

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Serve static files from the 'uploads' directory
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads',
  });

  await app.listen(port || 9999, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port || 9999}`);
  console.log(`External access: http://192.168.1.103:${port || 9999}`);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
