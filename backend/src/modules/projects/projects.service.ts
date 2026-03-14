import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../../database/entities/Project.entity';
import { Category } from '../../database/entities/Category.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  findAll() {
    return this.projectRepository.find({
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async create(createProjectDto: CreateProjectDto) {
    const { categoryId, ...data } = createProjectDto;
    const project = this.projectRepository.create(data);
    if (categoryId) {
      project.category = { id: categoryId } as Category;
    }
    return this.projectRepository.save(project);
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(id);
    const { categoryId, ...data } = updateProjectDto;

    Object.assign(project, data);

    if (categoryId !== undefined) {
      project.category = categoryId ? ({ id: categoryId } as Category) : null;
    }

    return this.projectRepository.save(project);
  }

  async remove(id: number) {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
    return { message: 'Project deleted successfully' };
  }
}
