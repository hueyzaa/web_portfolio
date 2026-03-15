import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { ProjectsModule } from '../projects/projects.module';
import { SkillsModule } from '../skills/skills.module';
import { ProfileModule } from '../profile/profile.module';
import { CategoriesModule } from '../categories/categories.module';
import { SettingsModule } from '../settings/settings.module';
import { ServicesModule } from '../services/services.module';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [
    ProjectsModule,
    SkillsModule,
    ProfileModule,
    CategoriesModule,
    SettingsModule,
    ServicesModule,
    ContactModule,
  ],
  controllers: [PublicController],
})
export class PublicModule {}
