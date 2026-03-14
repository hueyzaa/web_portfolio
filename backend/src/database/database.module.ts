import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/Project.entity';
import { Skill } from './entities/Skill.entity';
import { ContactMessage } from './entities/ContactMessage.entity';
import { User } from './entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Skill, ContactMessage, User])],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
