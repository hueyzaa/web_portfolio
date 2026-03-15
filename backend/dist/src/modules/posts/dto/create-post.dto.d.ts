import { PostStatus } from '../../../database/entities/Post.entity';
export declare class CreatePostDto {
    title: string;
    content: string;
    summary?: string;
    image?: string;
    source?: string;
    status?: PostStatus;
    is_featured?: boolean;
    meta_title?: string;
    meta_description?: string;
}
