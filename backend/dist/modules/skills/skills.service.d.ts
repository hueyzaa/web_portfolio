import { Repository } from 'typeorm';
import { Skill } from '../../database/entities/Skill.entity';
export declare class SkillsService {
    private readonly skillRepository;
    constructor(skillRepository: Repository<Skill>);
    findAll(): Promise<Skill[]>;
    create(skillData: Partial<Skill>): Promise<Skill>;
    remove(id: number): Promise<Skill>;
    update(id: number, skillData: Partial<Skill>): Promise<Skill>;
}
