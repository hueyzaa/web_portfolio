"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Project_entity_1 = require("./database/entities/Project.entity");
const Skill_entity_1 = require("./database/entities/Skill.entity");
const Category_entity_1 = require("./database/entities/Category.entity");
const ContactMessage_entity_1 = require("./database/entities/ContactMessage.entity");
const User_entity_1 = require("./database/entities/User.entity");
const Profile_entity_1 = require("./database/entities/Profile.entity");
const Service_entity_1 = require("./database/entities/Service.entity");
const Setting_entity_1 = require("./database/entities/Setting.entity");
const projects_module_1 = require("./modules/projects/projects.module");
const skills_module_1 = require("./modules/skills/skills.module");
const contact_module_1 = require("./modules/contact/contact.module");
const config_1 = require("@nestjs/config");
const env_config_1 = require("./configs/env.config");
const auth_module_1 = require("./modules/auth/auth.module");
const upload_module_1 = require("./modules/upload/upload.module");
const profile_module_1 = require("./modules/profile/profile.module");
const services_module_1 = require("./modules/services/services.module");
const categories_module_1 = require("./modules/categories/categories.module");
const settings_module_1 = require("./modules/settings/settings.module");
const media_module_1 = require("./modules/media/media.module");
const users_module_1 = require("./modules/users/users.module");
const Media_entity_1 = require("./database/entities/Media.entity");
const config_2 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [env_config_1.envConfig],
                envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_2.ConfigService],
                useFactory: (configService) => configService.get('env.database'),
            }),
            typeorm_1.TypeOrmModule.forFeature([
                Project_entity_1.Project,
                Skill_entity_1.Skill,
                Category_entity_1.Category,
                ContactMessage_entity_1.ContactMessage,
                User_entity_1.User,
                Profile_entity_1.Profile,
                Service_entity_1.Service,
                Setting_entity_1.Setting,
                Media_entity_1.Media,
            ]),
            auth_module_1.AuthModule,
            upload_module_1.UploadModule,
            profile_module_1.ProfileModule,
            services_module_1.ServicesModule,
            categories_module_1.CategoriesModule,
            settings_module_1.SettingsModule,
            media_module_1.MediaModule,
            users_module_1.UsersModule,
            projects_module_1.ProjectsModule,
            skills_module_1.SkillsModule,
            contact_module_1.ContactModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map