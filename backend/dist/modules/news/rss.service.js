"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var RssService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RssService = void 0;
const common_1 = require("@nestjs/common");
const rss_parser_1 = __importDefault(require("rss-parser"));
let RssService = RssService_1 = class RssService {
    logger = new common_1.Logger(RssService_1.name);
    parser = new rss_parser_1.default();
    async fetchFeed(url, sourceName) {
        try {
            const feed = await this.parser.parseURL(url);
            return feed.items
                .filter((item) => !!item.link)
                .map((item) => this.normalize(item, sourceName));
        }
        catch (error) {
            this.logger.error(`Failed to fetch RSS from ${sourceName}: ${url}`, error);
            return [];
        }
    }
    normalize(item, source) {
        let thumbnail = '';
        const mediaContent = item['media:content'];
        if (item.enclosure?.url) {
            thumbnail = item.enclosure.url;
        }
        else if (item.content) {
            const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch)
                thumbnail = imgMatch[1];
        }
        else if (mediaContent?.$?.url) {
            thumbnail = mediaContent.$.url;
        }
        const description = (item.contentSnippet || item.content || '')
            .replace(/<[^>]*>?/gm, '')
            .substring(0, 250);
        return {
            title: item.title || 'No Title',
            description,
            thumbnail,
            url: item.link || '',
            source,
            publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        };
    }
};
exports.RssService = RssService;
exports.RssService = RssService = RssService_1 = __decorate([
    (0, common_1.Injectable)()
], RssService);
//# sourceMappingURL=rss.service.js.map