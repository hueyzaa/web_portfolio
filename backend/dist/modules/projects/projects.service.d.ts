import { Repository } from 'typeorm';
import { Project } from '../../database/entities/Project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsService {
    private readonly projectRepository;
    constructor(projectRepository: Repository<Project>);
    findAll(): Promise<Project[]>;
    findOne(id: number): Promise<Project>;
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
