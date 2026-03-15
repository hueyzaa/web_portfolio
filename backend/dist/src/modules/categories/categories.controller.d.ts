import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<import("../../database/entities/Category.entity").Category[]>;
    create(name: string): Promise<import("../../database/entities/Category.entity").Category>;
    update(id: number, name: string): Promise<import("../../database/entities/Category.entity").Category>;
    remove(id: number): Promise<import("../../database/entities/Category.entity").Category>;
}
