'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AppModule = void 0;
const common_1 = require('@nestjs/common');
const typeorm_1 = require('@nestjs/typeorm');
const Project_entity_1 = require('./database/entities/Project.entity');
const Skill_entity_1 = require('./database/entities/Skill.entity');
const Category_entity_1 = require('./database/entities/Category.entity');
const ContactMessage_entity_1 = require('./database/entities/ContactMessage.entity');
const User_entity_1 = require('./database/entities/User.entity');
const Profile_entity_1 = require('./database/entities/Profile.entity');
const Service_entity_1 = require('./database/entities/Service.entity');
const Setting_entity_1 = require('./database/entities/Setting.entity');
const projects_controller_1 = require('./modules/projects/projects.controller');
const projects_service_1 = require('./modules/projects/projects.service');
const skills_controller_1 = require('./modules/skills/skills.controller');
const skills_service_1 = require('./modules/skills/skills.service');
const contact_controller_1 = require('./modules/contact/contact.controller');
const contact_service_1 = require('./modules/contact/contact.service');
const config_1 = require('@nestjs/config');
const env_config_1 = require('./configs/env.config');
const auth_module_1 = require('./modules/auth/auth.module');
const upload_module_1 = require('./modules/upload/upload.module');
const profile_module_1 = require('./modules/profile/profile.module');
const services_module_1 = require('./modules/services/services.module');
const categories_module_1 = require('./modules/categories/categories.module');
const settings_module_1 = require('./modules/settings/settings.module');
const media_module_1 = require('./modules/media/media.module');
const users_module_1 = require('./modules/users/users.module');
const Media_entity_1 = require('./database/entities/Media.entity');
let AppModule = class AppModule {};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        config_1.ConfigModule.forRoot({
          isGlobal: true,
          load: [env_config_1.envConfig],
          envFilePath: ['.env.development', '.env'],
        }),
        typeorm_1.TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.MYSQLHOST,
          port: Number(process.env.MYSQLPORT),
          username: process.env.MYSQLUSER,
          password: process.env.MYSQLPASSWORD,
          database: process.env.MYSQLDATABASE,
          autoLoadEntities: true,
          synchronize: true,
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
      ],
      controllers: [
        projects_controller_1.ProjectsController,
        skills_controller_1.SkillsController,
        contact_controller_1.ContactController,
      ],
      providers: [
        projects_service_1.ProjectsService,
        skills_service_1.SkillsService,
        contact_service_1.ContactService,
      ],
    }),
  ],
  AppModule,
);
//# sourceMappingURL=app.module.js.map
