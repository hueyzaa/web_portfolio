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
import { ProjectsController } from './modules/projects/projects.controller';
import { ProjectsService } from './modules/projects/projects.service';
import { SkillsController } from './modules/skills/skills.controller';
import { SkillsService } from './modules/skills/skills.service';
import { ContactController } from './modules/contact/contact.controller';
import { ContactService } from './modules/contact/contact.service';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
      envFilePath: ['.env.development', '.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'web_portfolio',
      autoLoadEntities: true,
      synchronize: true,
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
  ],
  controllers: [ProjectsController, SkillsController, ContactController],
  providers: [ProjectsService, SkillsService, ContactService],
})
export class AppModule {}
