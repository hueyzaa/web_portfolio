"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicModule = void 0;
const common_1 = require("@nestjs/common");
const public_controller_1 = require("./public.controller");
const projects_module_1 = require("../projects/projects.module");
const skills_module_1 = require("../skills/skills.module");
const profile_module_1 = require("../profile/profile.module");
const categories_module_1 = require("../categories/categories.module");
const settings_module_1 = require("../settings/settings.module");
const services_module_1 = require("../services/services.module");
const contact_module_1 = require("../contact/contact.module");
let PublicModule = class PublicModule {
};
exports.PublicModule = PublicModule;
exports.PublicModule = PublicModule = __decorate([
    (0, common_1.Module)({
        imports: [
            projects_module_1.ProjectsModule,
            skills_module_1.SkillsModule,
            profile_module_1.ProfileModule,
            categories_module_1.CategoriesModule,
            settings_module_1.SettingsModule,
            services_module_1.ServicesModule,
            contact_module_1.ContactModule,
        ],
        controllers: [public_controller_1.PublicController],
    })
], PublicModule);
//# sourceMappingURL=public.module.js.map