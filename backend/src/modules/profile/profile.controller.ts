import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from '../../database/entities/Profile.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile() {
    return this.profileService.getProfile();
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Body() data: Partial<Profile>) {
    return this.profileService.updateProfile(data);
  }
}
