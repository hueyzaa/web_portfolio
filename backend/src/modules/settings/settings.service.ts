import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from '../../database/entities/Setting.entity';

@Injectable()
export class SettingsService implements OnModuleInit {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async onModuleInit() {
    console.log('SettingsService: Initializing settings...');
    const defaultSettings = [
      {
        key: 'site_name',
        value: 'Phan Gia Mẫn',
        group: 'header',
        type: 'string',
      },
      {
        key: 'hero_title',
        value: 'Phan Gia Mẫn',
        group: 'hero',
        type: 'string',
      },
      {
        key: 'hero_tagline',
        value: 'Nghệ sĩ Kỹ thuật số & Nhà thiết kế Thị giác',
        group: 'hero',
        type: 'string',
      },
      {
        key: 'hero_description',
        value:
          'Tạo ra những trải nghiệm kỹ thuật số đắm chìm thông qua nghệ thuật và thiết kế.',
        group: 'hero',
        type: 'string',
      },
      {
        key: 'hero_bg_image',
        value:
          'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1974',
        group: 'hero',
        type: 'image',
      },
      {
        key: 'footer_copyright',
        value: '© 2024 Phan Gia Mẫn. Đã đăng ký bản quyền.',
        group: 'footer',
        type: 'string',
      },
      {
        key: 'footer_socials',
        value: JSON.stringify([
          { label: 'Behance', url: '#' },
          { label: 'Dribbble', url: '#' },
        ]),
        group: 'footer',
        type: 'json',
      },
      {
        key: 'site_logo',
        value: '',
        group: 'header',
        type: 'image',
      },
      {
        key: 'contact_label',
        value: 'LIÊN HỆ',
        group: 'contact',
        type: 'string',
      },
      {
        key: 'contact_title',
        value: 'Hãy cùng nhau hợp tác',
        group: 'contact',
        type: 'string',
      },
      {
        key: 'contact_description',
        value:
          'Bạn có một dự án trong tâm trí? Hãy liên hệ và cùng nhau tạo ra điều gì đó phi thường. Tôi sẵn sàng cho các dự án tự do và hợp tác nghệ thuật.',
        group: 'contact',
        type: 'string',
      },
      {
        key: 'contact_email',
        value: 'hello@phangiaman.com',
        group: 'contact',
        type: 'string',
      },
      {
        key: 'contact_instagram',
        value: '#',
        group: 'contact',
        type: 'string',
      },
      {
        key: 'contact_facebook',
        value: '#',
        group: 'contact',
        type: 'string',
      },
      {
        key: 'contact_linkedin',
        value: '#',
        group: 'contact',
        type: 'string',
      },
    ];

    for (const setting of defaultSettings) {
      const existing = await this.settingRepository.findOneBy({
        key: setting.key,
      });
      if (!existing) {
        await this.settingRepository.save(setting);
      }
    }
  }

  async findAll() {
    const settings = await this.settingRepository.find();
    return settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value || '';
      return acc;
    }, {});
  }

  async updateMany(settings: Record<string, string>) {
    for (const [key, value] of Object.entries(settings)) {
      let val = value;
      // Clean input: remove carriage returns and trim
      if (typeof val === 'string') {
        val = val.replace(/[\r]/g, '').trim();
      }

      const existing = await this.settingRepository.findOneBy({ key });
      if (existing) {
        existing.value = val;
        await this.settingRepository.save(existing);
      } else {
        await this.settingRepository.save({ key, value: val });
      }
    }
    return this.findAll();
  }

  async findByGroup(group: string) {
    return this.settingRepository.find({ where: { group } });
  }
}
