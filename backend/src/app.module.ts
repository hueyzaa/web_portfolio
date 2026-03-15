import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './database/entities/Project.entity';
import { Skill } from './database/entities/Skill.entity';
import { Category } from './database/entities/Category.entity';
import { ContactMessage } from './database/entities/ContactMessage.entity';
import { User } from './database/entities/User.entity';
import { Profile as ProfileEntity } from './database/entities/Profile.entity';
import { Service as ServiceEntity } from './database/entities/Service.entity';
import { Setting } from './database/entities/Setting.entity';
import { ProjectsModule } from './modules/projects/projects.module';
import { SkillsModule } from './modules/skills/skills.module';
import { ContactModule } from './modules/contact/contact.module';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './configs/env.config';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ServicesModule } from './modules/services/services.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { SettingsModule } from './modules/settings/settings.module';
import { MediaModule } from './modules/media/media.module';
import { UsersModule } from './modules/users/users.module';
import { Media } from './database/entities/Media.entity';
import { ConfigService } from '@nestjs/config';

import { PublicModule } from './modules/public/public.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('env.database')!,
    }),
    TypeOrmModule.forFeature([
      Project,
      Skill,
      Category,
      ContactMessage,
      User,
      ProfileEntity,
      ServiceEntity,
      Setting,
      Media,
    ]),
    AuthModule,
    UploadModule,
    ProfileModule,
    ServicesModule,
    CategoriesModule,
    SettingsModule,
    MediaModule,
    UsersModule,
    ProjectsModule,
    SkillsModule,
    ContactModule,
    PublicModule,
  ],
})
export class AppModule {}
