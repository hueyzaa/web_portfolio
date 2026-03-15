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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Profile_entity_1 = require("../../database/entities/Profile.entity");
let ProfileService = class ProfileService {
    profileRepository;
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    async onModuleInit() {
        const count = await this.profileRepository.count();
        if (count === 0) {
            await this.profileRepository.save({
                label: 'GIỚI THIỆU | TÔI',
                title: 'Làm chủ sự giao thoa giữa công nghệ và sự sáng tạo',
                description: 'Tôi là một nghệ sĩ kỹ thuật số sống tại Việt Nam với hơn 5 năm kinh nghiệm trong ngành sáng tạo...',
                imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1974',
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
    async updateProfile(data) {
        const profile = await this.getProfile();
        if (!profile) {
            return this.profileRepository.save(data);
        }
        return this.profileRepository.save({ ...profile, ...data });
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Profile_entity_1.Profile)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProfileService);
//# sourceMappingURL=profile.service.js.map