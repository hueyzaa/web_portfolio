import { Repository } from 'typeorm';
import { News } from './news.entity';
import { RssService } from './rss.service';
export declare class NewsService {
    private readonly newsRepository;
    private readonly rssService;
    private readonly logger;
    private readonly SOURCES;
    constructor(newsRepository: Repository<News>, rssService: RssService);
    handleCron(): Promise<void>;
    refreshNews(): Promise<{
        message: string;
        newItems: number;
    }>;
    private upsertNews;
    private detectCategory;
    findAll(category?: string): Promise<News[]>;
    findFeatured(): Promise<News[]>;
    findAllAdmin(): Promise<News[]>;
    toggleFeature(id: number): Promise<News | null>;
    toggleHide(id: number): Promise<News | null>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
