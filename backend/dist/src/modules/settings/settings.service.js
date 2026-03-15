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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Setting_entity_1 = require("../../database/entities/Setting.entity");
let SettingsService = class SettingsService {
    settingRepository;
    constructor(settingRepository) {
        this.settingRepository = settingRepository;
    }
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
                value: 'Tạo ra những trải nghiệm kỹ thuật số đắm chìm thông qua nghệ thuật và thiết kế.',
                group: 'hero',
                type: 'string',
            },
            {
                key: 'hero_bg_image',
                value: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1974',
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
                value: 'Bạn có một dự án trong tâm trí? Hãy liên hệ và cùng nhau tạo ra điều gì đó phi thường. Tôi sẵn sàng cho các dự án tự do và hợp tác nghệ thuật.',
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
    async updateMany(settings) {
        for (const [key, value] of Object.entries(settings)) {
            let val = value;
            if (typeof val === 'string') {
                val = val.replace(/[\r]/g, '').trim();
            }
            const existing = await this.settingRepository.findOneBy({ key });
            if (existing) {
                existing.value = val;
                await this.settingRepository.save(existing);
            }
            else {
                await this.settingRepository.save({ key, value: val });
            }
        }
        return this.findAll();
    }
    async findByGroup(group) {
        return this.settingRepository.find({ where: { group } });
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Setting_entity_1.Setting)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SettingsService);
//# sourceMappingURL=settings.service.js.map