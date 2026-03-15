import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './news.entity';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { RssService } from './rss.service';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  controllers: [NewsController],
  providers: [NewsService, RssService],
  exports: [NewsService],
})
export class NewsModule {}
