export interface NormalizedNews {
    title: string;
    description: string;
    thumbnail: string;
    url: string;
    source: string;
    publishedAt: Date;
}
export declare class RssService {
    private readonly logger;
    private parser;
    fetchFeed(url: string, sourceName: string): Promise<NormalizedNews[]>;
    private normalize;
}
