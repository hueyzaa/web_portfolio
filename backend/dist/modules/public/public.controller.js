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
exports.PublicController = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const projects_service_1 = require("../projects/projects.service");
const skills_service_1 = require("../skills/skills.service");
const profile_service_1 = require("../profile/profile.service");
const categories_service_1 = require("../categories/categories.service");
const settings_service_1 = require("../settings/settings.service");
const services_service_1 = require("../services/services.service");
const contact_service_1 = require("../contact/contact.service");
let PublicController = class PublicController {
    projectsService;
    skillsService;
    profileService;
    categoriesService;
    settingsService;
    servicesService;
    contactService;
    constructor(projectsService, skillsService, profileService, categoriesService, settingsService, servicesService, contactService) {
        this.projectsService = projectsService;
        this.skillsService = skillsService;
        this.profileService = profileService;
        this.categoriesService = categoriesService;
        this.settingsService = settingsService;
        this.servicesService = servicesService;
        this.contactService = contactService;
    }
    async findAllProjects() {
        return this.projectsService.findAll();
    }
    async findOneProject(id) {
        return this.projectsService.findOne(id);
    }
    async findAllSkills() {
        return this.skillsService.findAll();
    }
    async getProfile() {
        return this.profileService.getProfile();
    }
    async findAllCategories() {
        return this.categoriesService.findAll();
    }
    async findAllSettings() {
        return this.settingsService.findAll();
    }
    async findAllServices() {
        return this.servicesService.findAll();
    }
    async createContact(contactData) {
        return this.contactService.create(contactData);
    }
};
exports.PublicController = PublicController;
__decorate([
    (0, common_1.Header)('Cache-Control', 'public, max-age=3600'),
    (0, cache_manager_1.CacheTTL)(3600),
    (0, common_1.Get)('projects'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "findAllProjects", null);
__decorate([
    (0, common_1.Get)('projects/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "findOneProject", null);
__decorate([
    (0, common_1.Header)('Cache-Control', 'public, max-age=600'),
    (0, cache_manager_1.CacheTTL)(600),
    (0, common_1.Get)('skills'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "findAllSkills", null);
__decorate([
    (0, common_1.Get)('profile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "findAllCategories", null);
__decorate([
    (0, common_1.Get)('settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "findAllSettings", null);
__decorate([
    (0, common_1.Get)('services'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "findAllServices", null);
__decorate([
    (0, common_1.Post)('contact'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicController.prototype, "createContact", null);
exports.PublicController = PublicController = __decorate([
    (0, common_1.Controller)('public'),
    __metadata("design:paramtypes", [projects_service_1.ProjectsService,
        skills_service_1.SkillsService,
        profile_service_1.ProfileService,
        categories_service_1.CategoriesService,
        settings_service_1.SettingsService,
        services_service_1.ServicesService,
        contact_service_1.ContactService])
], PublicController);
//# sourceMappingURL=public.controller.js.map