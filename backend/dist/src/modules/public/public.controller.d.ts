import { ProjectsService } from '../projects/projects.service';
import { SkillsService } from '../skills/skills.service';
import { ProfileService } from '../profile/profile.service';
import { CategoriesService } from '../categories/categories.service';
import { SettingsService } from '../settings/settings.service';
import { ServicesService } from '../services/services.service';
import { ContactService } from '../contact/contact.service';
import { ContactMessage } from '../../database/entities/ContactMessage.entity';
export declare class PublicController {
    private readonly projectsService;
    private readonly skillsService;
    private readonly profileService;
    private readonly categoriesService;
    private readonly settingsService;
    private readonly servicesService;
    private readonly contactService;
    constructor(projectsService: ProjectsService, skillsService: SkillsService, profileService: ProfileService, categoriesService: CategoriesService, settingsService: SettingsService, servicesService: ServicesService, contactService: ContactService);
    findAllProjects(): Promise<import("../../database/entities/Project.entity").Project[]>;
    findOneProject(id: number): Promise<import("../../database/entities/Project.entity").Project>;
    findAllSkills(): Promise<import("../../database/entities/Skill.entity").Skill[]>;
    getProfile(): Promise<import("../../database/entities/Profile.entity").Profile | null>;
    findAllCategories(): Promise<import("../../database/entities/Category.entity").Category[]>;
    findAllSettings(): Promise<{}>;
    findAllServices(): Promise<import("../../database/entities/Service.entity").Service[]>;
    createContact(contactData: Partial<ContactMessage>): Promise<ContactMessage>;
}
