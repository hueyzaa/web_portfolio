import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../../database/entities/Profile.entity';

@Injectable()
export class ProfileService implements OnModuleInit {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async onModuleInit() {
    const count = await this.profileRepository.count();
    if (count === 0) {
      await this.profileRepository.save({
        label: 'GIỚI THIỆU | TÔI',
        title: 'Làm chủ sự giao thoa giữa công nghệ và sự sáng tạo',
        description:
          'Tôi là một nghệ sĩ kỹ thuật số sống tại Việt Nam với hơn 5 năm kinh nghiệm trong ngành sáng tạo...',
        imageUrl:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974',
        stats: [
          { number: '50+', label: 'Dự án Hoàn thành' },
          { number: '12+', label: 'Giải thưởng Quốc tế' },
        ],
      });
    }
  }

  async getProfile() {
    return this.profileRepository.findOne({ where: {} });
  }

  async updateProfile(data: Partial<Profile>) {
    const profile = await this.getProfile();
    if (!profile) {
      return this.profileRepository.save(data);
    }
    return this.profileRepository.save({ ...profile, ...data });
  }
}
