import { Repository } from 'typeorm';
import { Post } from '../../database/entities/Post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsService {
    private readonly postsRepository;
    private readonly logger;
    private parser;
    constructor(postsRepository: Repository<Post>);
    private readonly RSS_SOURCES;
    handleCron(): Promise<void>;
    fetchAndSaveRssNews(): Promise<void>;
    findAll(): Promise<Post[]>;
    findOne(id: number): Promise<Post | null>;
    create(createPostDto: CreatePostDto): Promise<Post>;
    update(id: number, updatePostDto: UpdatePostDto): Promise<Post | null>;
    publish(id: number): Promise<Post | null>;
    unpublish(id: number): Promise<Post | null>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
    getPublicPosts(): Promise<Post[]>;
    getPublicPostBySlug(slug: string): Promise<Post | null>;
    private generateSlug;
}
