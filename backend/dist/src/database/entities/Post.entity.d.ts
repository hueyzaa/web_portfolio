export declare enum PostStatus {
    DRAFT = "draft",
    PUBLISHED = "published"
}
export declare class Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    summary: string;
    image: string;
    source: string;
    status: PostStatus;
    is_featured: boolean;
    published_at: Date;
    meta_title: string;
    meta_description: string;
    created_at: Date;
    updated_at: Date;
}
