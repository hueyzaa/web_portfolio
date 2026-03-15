import { NewsService } from './news.service';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    findAll(category?: string): Promise<import("./news.entity").News[]>;
    findFeatured(): Promise<import("./news.entity").News[]>;
    findAllAdmin(): Promise<import("./news.entity").News[]>;
    refresh(): Promise<{
        message: string;
    }>;
    toggleFeature(id: string): Promise<import("./news.entity").News | null>;
    toggleHide(id: string): Promise<import("./news.entity").News | null>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
