import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './modules/auth/auth.service';
import { User } from './database/entities/User.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const authService = app.get(AuthService);
  const userRepository = app.get<Repository<User>>(getRepositoryToken(User));

  const username = 'admin';
  const password = '123';

  const existingUser = await userRepository.findOne({ where: { username } });
  if (existingUser) {
    console.log('Admin user already exists');
  } else {
    const hashedPassword = await authService.hashPassword(password);
    const newUser = userRepository.create({
      username,
      password: hashedPassword,
      fullName: 'Administrator',
    });
    await userRepository.save(newUser);
    console.log('Admin user created successfully');
    console.log('Username: admin');
    console.log('Password: 123');
  }

  await app.close();
}
bootstrap().catch(console.error);
