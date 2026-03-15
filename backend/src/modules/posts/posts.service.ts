import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RSSParser from 'rss-parser';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Post, PostStatus } from '../../database/entities/Post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  private parser: RSSParser = new RSSParser();

  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  // RSS Sources
  private readonly RSS_SOURCES = [
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

  @Cron(CronExpression.EVERY_WEEKEND) // Adjusting to weekend as per requirement (Monday could be EVERY_MONDAY)
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
              status: PostStatus.DRAFT,
              is_featured: false,
              image: '', // RSS might not have direct image field, usually in content
            });
            await this.postsRepository.save(post);
          }
        }
      } catch (error) {
        this.logger.error(`Error fetching from ${source.name}:`, error);
      }
    }
  }

  // Admin Methods
  async findAll() {
    return this.postsRepository.find({ order: { created_at: 'DESC' } });
  }

  async findOne(id: number) {
    return this.postsRepository.findOne({ where: { id } });
  }

  async create(createPostDto: CreatePostDto) {
    const slug = this.generateSlug(createPostDto.title);
    const post = this.postsRepository.create({ ...createPostDto, slug });
    return this.postsRepository.save(post);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const updateData: Partial<Post> = { ...updatePostDto };
    if (updatePostDto.title) {
      updateData.slug = this.generateSlug(updatePostDto.title);
    }
    await this.postsRepository.update(id, updateData);
    return this.findOne(id);
  }

  async publish(id: number) {
    await this.postsRepository.update(id, {
      status: PostStatus.PUBLISHED,
      published_at: new Date(),
    });
    return this.findOne(id);
  }

  async unpublish(id: number) {
    await this.postsRepository.update(id, {
      status: PostStatus.DRAFT,
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    if (post) {
      await this.postsRepository.remove(post);
    }
    return { deleted: true };
  }

  // Public Methods
  async getPublicPosts() {
    return this.postsRepository.find({
      where: { status: PostStatus.PUBLISHED },
      order: { published_at: 'DESC' },
    });
  }

  async getPublicPostBySlug(slug: string) {
    return this.postsRepository.findOne({
      where: { slug, status: PostStatus.PUBLISHED },
    });
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
