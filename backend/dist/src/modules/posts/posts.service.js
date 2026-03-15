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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var PostsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rss_parser_1 = __importDefault(require("rss-parser"));
const schedule_1 = require("@nestjs/schedule");
const Post_entity_1 = require("../../database/entities/Post.entity");
let PostsService = PostsService_1 = class PostsService {
    postsRepository;
    logger = new common_1.Logger(PostsService_1.name);
    parser = new rss_parser_1.default();
    constructor(postsRepository) {
        this.postsRepository = postsRepository;
    }
    RSS_SOURCES = [
        { name: 'Creative Bloq', url: 'https://www.creativebloq.com/feed' },
        { name: 'Designboom', url: 'https://www.designboom.com/feed' },
        {
            name: 'TechCrunch AI',
            url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
        },
        {
            name: 'Wired AI',
            url: 'https://www.wired.com/feed/category/ai/latest/rss',
        },
        {
            name: 'Smashing Magazine',
            url: 'https://www.smashingmagazine.com/feed/',
        },
        { name: 'Awwwards', url: 'https://www.awwwards.com/blog/feed/' },
    ];
    async handleCron() {
        this.logger.debug('Fetching design news from RSS...');
        await this.fetchAndSaveRssNews();
    }
    async fetchAndSaveRssNews() {
        for (const source of this.RSS_SOURCES) {
            try {
                const feed = await this.parser.parseURL(source.url);
                for (const item of feed.items) {
                    const slug = this.generateSlug(item.title || '');
                    const exists = await this.postsRepository.findOne({
                        where: { slug },
                    });
                    if (!exists) {
                        const post = this.postsRepository.create({
                            title: item.title,
                            slug,
                            content: item.content || item.contentSnippet || '',
                            summary: item.contentSnippet || '',
                            source: source.name,
                            status: Post_entity_1.PostStatus.DRAFT,
                            is_featured: false,
                            image: '',
                        });
                        await this.postsRepository.save(post);
                    }
                }
            }
            catch (error) {
                this.logger.error(`Error fetching from ${source.name}:`, error);
            }
        }
    }
    async findAll() {
        return this.postsRepository.find({ order: { created_at: 'DESC' } });
    }
    async findOne(id) {
        return this.postsRepository.findOne({ where: { id } });
    }
    async create(createPostDto) {
        const slug = this.generateSlug(createPostDto.title);
        const post = this.postsRepository.create({ ...createPostDto, slug });
        return this.postsRepository.save(post);
    }
    async update(id, updatePostDto) {
        const updateData = { ...updatePostDto };
        if (updatePostDto.title) {
            updateData.slug = this.generateSlug(updatePostDto.title);
        }
        await this.postsRepository.update(id, updateData);
        return this.findOne(id);
    }
    async publish(id) {
        await this.postsRepository.update(id, {
            status: Post_entity_1.PostStatus.PUBLISHED,
            published_at: new Date(),
        });
        return this.findOne(id);
    }
    async unpublish(id) {
        await this.postsRepository.update(id, {
            status: Post_entity_1.PostStatus.DRAFT,
        });
        return this.findOne(id);
    }
    async remove(id) {
        const post = await this.findOne(id);
        if (post) {
            await this.postsRepository.remove(post);
        }
        return { deleted: true };
    }
    async getPublicPosts() {
        return this.postsRepository.find({
            where: { status: Post_entity_1.PostStatus.PUBLISHED },
            order: { published_at: 'DESC' },
        });
    }
    async getPublicPostBySlug(slug) {
        return this.postsRepository.findOne({
            where: { slug, status: Post_entity_1.PostStatus.PUBLISHED },
        });
    }
    generateSlug(title) {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
};
exports.PostsService = PostsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_WEEKEND),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsService.prototype, "handleCron", null);
exports.PostsService = PostsService = PostsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostsService);
//# sourceMappingURL=posts.service.js.map