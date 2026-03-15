"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NewsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const schedule_1 = require("@nestjs/schedule");
const news_entity_1 = require("./news.entity");
const rss_service_1 = require("./rss.service");
let NewsService = NewsService_1 = class NewsService {
    newsRepository;
    rssService;
    logger = new common_1.Logger(NewsService_1.name);
    SOURCES = [
        {
            name: 'VnExpress Technology',
            url: 'https://vnexpress.net/rss/so-hoa.rss',
        },
        { name: 'GenK', url: 'https://genk.vn/rss/home.rss' },
        { name: 'Tinhte', url: 'https://tinhte.vn/rss' },
        { name: 'DesignerVN', url: 'https://designervn.net/rss/' },
        { name: 'BrandsVietnam', url: 'https://www.brandsvietnam.com/rss' },
    ];
    constructor(newsRepository, rssService) {
        this.newsRepository = newsRepository;
        this.rssService = rssService;
    }
    async handleCron() {
        this.logger.log('Starting scheduled news aggregation...');
        await this.refreshNews();
    }
    async refreshNews() {
        this.logger.log('Refreshing news from sources...');
        let totalUpserted = 0;
        for (const source of this.SOURCES) {
            try {
                const items = await this.rssService.fetchFeed(source.url, source.name);
                this.logger.log(`Fetched ${items.length} items from ${source.name}`);
                for (const item of items) {
                    try {
                        const upserted = await this.upsertNews(item);
                        if (upserted)
                            totalUpserted++;
                    }
                    catch (error) {
                        this.logger.error(`Failed to upsert news item: ${item.url}`, error instanceof Error ? error.stack : undefined);
                    }
                }
            }
            catch (error) {
                this.logger.error(`Failed to refresh news from source: ${source.name}`, error instanceof Error ? error.stack : undefined);
            }
        }
        this.logger.log(`Refresh cycle complete. Total new items: ${totalUpserted}`);
        return { message: 'News refreshed successfully', newItems: totalUpserted };
    }
    async upsertNews(item) {
        try {
            if (!item.url)
                return false;
            const category = this.detectCategory(item.title + ' ' + item.description);
            await this.newsRepository.upsert({
                title: item.title,
                description: item.description,
                thumbnail: item.thumbnail,
                url: item.url,
                source: item.source,
                published_at: item.publishedAt,
                category,
            }, ['url']);
            return true;
        }
        catch (error) {
            this.logger.error(`Error in upsertNews for URL: ${item.url}`, error instanceof Error ? error.stack : undefined);
            return false;
        }
    }
    detectCategory(text) {
        const t = text.toLowerCase();
        const designKeywords = [
            'ui',
            'ux',
            'typography',
            'logo',
            'branding',
            'graphic design',
            'thiết kế',
            'đồ họa',
        ];
        const techKeywords = [
            'ai',
            'apple',
            'google',
            'software',
            'hardware',
            'công nghệ',
            'trí tuệ nhân tạo',
            'phần mềm',
        ];
        const brandingKeywords = [
            'branding',
            'thương hiệu',
            'marketing',
            'chiến dịch',
        ];
        if (designKeywords.some((k) => t.includes(k)))
            return 'Design';
        if (techKeywords.some((k) => t.includes(k)))
            return 'Technology';
        if (brandingKeywords.some((k) => t.includes(k)))
            return 'Branding';
        return 'General';
    }
    async findAll(category) {
        const query = this.newsRepository
            .createQueryBuilder('news')
            .where('news.is_hidden = :isHidden', { isHidden: false });
        if (category && category !== 'All') {
            query.andWhere('news.category = :category', { category });
        }
        return query.orderBy('news.published_at', 'DESC').getMany();
    }
    async findFeatured() {
        return this.newsRepository.find({
            where: { is_featured: true, is_hidden: false },
            order: { published_at: 'DESC' },
        });
    }
    async findAllAdmin() {
        try {
            return await this.newsRepository.find({ order: { created_at: 'DESC' } });
        }
        catch (error) {
            this.logger.error('Failed to fetch news for admin', error instanceof Error ? error.stack : undefined);
            throw error;
        }
    }
    async toggleFeature(id) {
        const news = await this.newsRepository.findOne({ where: { id } });
        if (news) {
            news.is_featured = !news.is_featured;
            await this.newsRepository.save(news);
        }
        return news;
    }
    async toggleHide(id) {
        const news = await this.newsRepository.findOne({ where: { id } });
        if (news) {
            news.is_hidden = !news.is_hidden;
            await this.newsRepository.save(news);
        }
        return news;
    }
    async remove(id) {
        await this.newsRepository.delete(id);
        return { deleted: true };
    }
};
exports.NewsService = NewsService;
__decorate([
    (0, schedule_1.Cron)('0 */6 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsService.prototype, "handleCron", null);
exports.NewsService = NewsService = NewsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(news_entity_1.News)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        rss_service_1.RssService])
], NewsService);
//# sourceMappingURL=news.service.js.map