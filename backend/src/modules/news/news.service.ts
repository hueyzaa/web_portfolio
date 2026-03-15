import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { News } from './news.entity';
import { RssService, NormalizedNews } from './rss.service';

@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);

  private readonly SOURCES = [
    {
      name: 'VnExpress Technology',
      url: 'https://vnexpress.net/rss/so-hoa.rss',
    },
    { name: 'GenK', url: 'https://genk.vn/rss/home.rss' },
    { name: 'Tinhte', url: 'https://tinhte.vn/rss' },
    { name: 'DesignerVN', url: 'https://designervn.net/rss/' },
    { name: 'BrandsVietnam', url: 'https://www.brandsvietnam.com/rss' },
  ];

  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    private readonly rssService: RssService,
  ) {}

  @Cron('0 */6 * * *')
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
            if (upserted) totalUpserted++;
          } catch (error) {
            this.logger.error(
              `Failed to upsert news item: ${item.url}`,
              error instanceof Error ? error.stack : undefined,
            );
          }
        }
      } catch (error) {
        this.logger.error(
          `Failed to refresh news from source: ${source.name}`,
          error instanceof Error ? error.stack : undefined,
        );
      }
    }

    this.logger.log(
      `Refresh cycle complete. Total new items: ${totalUpserted}`,
    );
    return { message: 'News refreshed successfully', newItems: totalUpserted };
  }

  private async upsertNews(item: NormalizedNews): Promise<boolean> {
    const existing = await this.newsRepository.findOne({
      where: { url: item.url },
    });
    if (existing) return false;

    const category = this.detectCategory(item.title + ' ' + item.description);

    const news = this.newsRepository.create({
      title: item.title,
      description: item.description,
      thumbnail: item.thumbnail,
      url: item.url,
      source: item.source,
      published_at: item.publishedAt,
      category,
    });

    await this.newsRepository.save(news);
    return true;
  }

  private detectCategory(text: string): string {
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

    if (designKeywords.some((k) => t.includes(k))) return 'Design';
    if (techKeywords.some((k) => t.includes(k))) return 'Technology';
    if (brandingKeywords.some((k) => t.includes(k))) return 'Branding';

    return 'General';
  }

  async findAll(category?: string) {
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

  // Admin methods
  async findAllAdmin() {
    try {
      return await this.newsRepository.find({ order: { created_at: 'DESC' } });
    } catch (error) {
      this.logger.error(
        'Failed to fetch news for admin',
        error instanceof Error ? error.stack : undefined,
      );
      throw error;
    }
  }

  async toggleFeature(id: number) {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (news) {
      news.is_featured = !news.is_featured;
      await this.newsRepository.save(news);
    }
    return news;
  }

  async toggleHide(id: number) {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (news) {
      news.is_hidden = !news.is_hidden;
      await this.newsRepository.save(news);
    }
    return news;
  }

  async remove(id: number) {
    await this.newsRepository.delete(id);
    return { deleted: true };
  }
}
