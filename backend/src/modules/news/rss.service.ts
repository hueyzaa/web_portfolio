import { Injectable, Logger } from '@nestjs/common';
import RSSParser from 'rss-parser';

export interface NormalizedNews {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  source: string;
  publishedAt: Date;
}

interface RssItem extends RSSParser.Item {
  'media:content'?: {
    $?: {
      url?: string;
    };
  };
}

@Injectable()
export class RssService {
  private readonly logger = new Logger(RssService.name);
  private parser: RSSParser = new RSSParser();

  async fetchFeed(url: string, sourceName: string): Promise<NormalizedNews[]> {
    try {
      const feed = await this.parser.parseURL(url);
      return (feed.items as RssItem[])
        .filter((item) => !!item.link)
        .map((item) => this.normalize(item, sourceName));
    } catch (error) {
      this.logger.error(
        `Failed to fetch RSS from ${sourceName}: ${url}`,
        error,
      );
      return [];
    }
  }

  private normalize(item: RssItem, source: string): NormalizedNews {
    let thumbnail = '';

    const mediaContent = item['media:content'];
    if (item.enclosure?.url) {
      thumbnail = item.enclosure.url;
    } else if (item.content) {
      // Regex to find first img src in content
      const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
      if (imgMatch) thumbnail = imgMatch[1];
    } else if (mediaContent?.$?.url) {
      thumbnail = mediaContent.$.url;
    }

    // Clean description: remove HTML tags and handle missing values
    const description =
      (item.contentSnippet || item.content || '')
        .replace(/<[^>]*>?/gm, '')
        .substring(0, 250) || 'No description available';

    return {
      title: (item.title || 'No Title').trim(),
      description,
      thumbnail: thumbnail || '',
      url: item.link || '',
      source: source || 'Unknown Source',
      publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
    };
  }
}
