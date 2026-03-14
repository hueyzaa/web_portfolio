import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(): Promise<{
        id: number;
        title: string;
        description: string;
        image: string;
        category: import("../../database/entities/Category.entity").Category | null;
        content: string;
        createdAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        description: string;
        image: string;
        category: import("../../database/entities/Category.entity").Category | null;
        content: string;
        createdAt: Date;
    }>;
    create(createProjectDto: CreateProjectDto): Promise<import("../../database/entities/Project.entity").Project>;
    update(id: number, updateProjectDto: UpdateProjectDto): Promise<{
        id: number;
        title: string;
        description: string;
        image: string;
        category: import("../../database/entities/Category.entity").Category | null;
        content: string;
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
