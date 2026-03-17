import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Header,
} from '@nestjs/common';
import { CacheTTL } from '@nestjs/cache-manager';
import { ProjectsService } from '../projects/projects.service';
import { SkillsService } from '../skills/skills.service';
import { ProfileService } from '../profile/profile.service';
import { CategoriesService } from '../categories/categories.service';
import { SettingsService } from '../settings/settings.service';
import { ServicesService } from '../services/services.service';
import { ContactService } from '../contact/contact.service';

import { ContactMessage } from '../../database/entities/ContactMessage.entity';

@Controller('public')
export class PublicController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly skillsService: SkillsService,
    private readonly profileService: ProfileService,
    private readonly categoriesService: CategoriesService,
    private readonly settingsService: SettingsService,
    private readonly servicesService: ServicesService,
    private readonly contactService: ContactService,
  ) {}

  @Header('Cache-Control', 'public, max-age=3600')
  @CacheTTL(3600) // 1 hour for projects list
  @Get('projects')
  async findAllProjects() {
    return this.projectsService.findAll();
  }

  @Get('projects/:id')
  async findOneProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.findOne(id);
  }

  @Header('Cache-Control', 'public, max-age=600')
  @CacheTTL(600) // 10 minutes for skills
  @Get('skills')
  async findAllSkills() {
    return this.skillsService.findAll();
  }

  @Get('profile')
  async getProfile() {
    return this.profileService.getProfile();
  }

  @Get('categories')
  async findAllCategories() {
    return this.categoriesService.findAll();
  }

  @Get('settings')
  async findAllSettings() {
    return this.settingsService.findAll();
  }

  @Get('services')
  async findAllServices() {
    return this.servicesService.findAll();
  }

  @Post('contact')
  async createContact(@Body() contactData: Partial<ContactMessage>) {
    return this.contactService.create(contactData);
  }
}
