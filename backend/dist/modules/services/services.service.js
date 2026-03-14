"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Service_entity_1 = require("../../database/entities/Service.entity");
let ServicesService = class ServicesService {
    serviceRepository;
    constructor(serviceRepository) {
        this.serviceRepository = serviceRepository;
    }
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
                    description: 'Giao diện có độ trung thực cao tập trung vào người dùng.',
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
                    description: 'Hình minh họa tùy chỉnh chất lượng cao cho tạp chí, trang web và tài liệu quảng cáo.',
                    icon: 'draw',
                    isProfessional: true,
                },
                {
                    title: 'Nghệ thuật Ý tưởng',
                    description: 'Xây dựng thế giới, thiết kế nhân vật và nghệ thuật môi trường cho trò chơi và phim.',
                    icon: 'movie_filter',
                    isProfessional: true,
                },
                {
                    title: 'Thương hiệu & Thiết kế Thị giác',
                    description: 'Bản sắc thị giác, logo và thiết kế UI/UX hiện đại giúp nâng tầm thương hiệu của bạn.',
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
    create(serviceData) {
        const service = this.serviceRepository.create(serviceData);
        return this.serviceRepository.save(service);
    }
    async update(id, serviceData) {
        const service = await this.serviceRepository.findOne({ where: { id } });
        if (!service)
            throw new Error('Service not found');
        Object.assign(service, serviceData);
        return this.serviceRepository.save(service);
    }
    async remove(id) {
        const service = await this.serviceRepository.findOne({ where: { id } });
        if (!service)
            throw new Error('Service not found');
        return this.serviceRepository.remove(service);
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Service_entity_1.Service)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServicesService);
//# sourceMappingURL=services.service.js.map