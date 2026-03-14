import { SkillsService } from './skills.service';
import { Skill } from '../../database/entities/Skill.entity';
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
    findAll(): Promise<Skill[]>;
    create(skillData: Partial<Skill>): Promise<Skill>;
    update(id: number, skillData: Partial<Skill>): Promise<Skill>;
    remove(id: number): Promise<Skill>;
}
