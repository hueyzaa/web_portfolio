import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getPublicPosts(): Promise<import("../../database/entities/Post.entity").Post[]>;
    getPublicPost(slug: string): Promise<import("../../database/entities/Post.entity").Post | null>;
    findAll(): Promise<import("../../database/entities/Post.entity").Post[]>;
    create(createPostDto: CreatePostDto): Promise<import("../../database/entities/Post.entity").Post>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<import("../../database/entities/Post.entity").Post | null>;
    publish(id: string): Promise<import("../../database/entities/Post.entity").Post | null>;
    unpublish(id: string): Promise<import("../../database/entities/Post.entity").Post | null>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
