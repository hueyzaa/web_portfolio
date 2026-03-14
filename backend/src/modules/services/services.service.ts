import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../../database/entities/Service.entity';

@Injectable()
export class ServicesService implements OnModuleInit {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async onModuleInit() {
    const count = await this.serviceRepository.count();
    if (count === 0) {
      const defaultServices = [
        {
          title: 'Nghệ thuật Kỹ thuật số',
          description: 'Tạo các hình minh họa tùy chỉnh với kết cấu sống động.',
          icon: 'brush',
          isProfessional: false,
        },
        {
          title: 'Thiết kế UI',
          description:
            'Giao diện có độ trung thực cao tập trung vào người dùng.',
          icon: 'layers',
          isProfessional: false,
        },
        {
          title: 'Điêu khắc 3D',
          description: 'Mô hình nhân vật chi tiết và tài sản môi trường.',
          icon: 'view_in_ar',
          isProfessional: false,
        },
        {
          title: 'Thương hiệu',
          description: 'Bản sắc hình ảnh gắn kết cho các công ty hiện đại.',
          icon: 'palette',
          isProfessional: false,
        },
        {
          title: 'Minh họa Kỹ thuật số',
          description:
            'Hình minh họa tùy chỉnh chất lượng cao cho tạp chí, trang web và tài liệu quảng cáo.',
          icon: 'draw',
          isProfessional: true,
        },
        {
          title: 'Nghệ thuật Ý tưởng',
          description:
            'Xây dựng thế giới, thiết kế nhân vật và nghệ thuật môi trường cho trò chơi và phim.',
          icon: 'movie_filter',
          isProfessional: true,
        },
        {
          title: 'Thương hiệu & Thiết kế Thị giác',
          description:
            'Bản sắc thị giác, logo và thiết kế UI/UX hiện đại giúp nâng tầm thương hiệu của bạn.',
          icon: 'auto_awesome',
          isProfessional: true,
        },
      ];
      await this.serviceRepository.save(defaultServices);
    }
  }

  findAll() {
    return this.serviceRepository.find();
  }

  create(serviceData: Partial<Service>) {
    const service = this.serviceRepository.create(serviceData);
    return this.serviceRepository.save(service);
  }

  async update(id: number, serviceData: Partial<Service>) {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) throw new Error('Service not found');
    Object.assign(service, serviceData);
    return this.serviceRepository.save(service);
  }

  async remove(id: number) {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) throw new Error('Service not found');
    return this.serviceRepository.remove(service);
  }
}
