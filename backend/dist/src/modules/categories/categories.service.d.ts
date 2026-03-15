import { Repository } from 'typeorm';
import { Category } from '../../database/entities/Category.entity';
export declare class CategoriesService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    findAll(): Promise<Category[]>;
    create(name: string): Promise<Category>;
    update(id: number, name: string): Promise<Category>;
    remove(id: number): Promise<Category>;
}
