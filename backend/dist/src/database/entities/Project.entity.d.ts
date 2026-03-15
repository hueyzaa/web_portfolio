import { Category } from './Category.entity';
export declare class Project {
    id: number;
    title: string;
    description: string;
    image: string;
    category: Category | null;
    content: string;
    createdAt: Date;
}
