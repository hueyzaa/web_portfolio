import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  findAll(@Query('category') category?: string) {
    return this.newsService.findAll(category);
  }

  @Get('featured')
  findFeatured() {
    return this.newsService.findFeatured();
  }

  // Admin APIs
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  findAllAdmin() {
    return this.newsService.findAllAdmin();
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  refresh() {
    return this.newsService.refreshNews();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/feature')
  toggleFeature(@Param('id') id: string) {
    return this.newsService.toggleFeature(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/hide')
  toggleHide(@Param('id') id: string) {
    return this.newsService.toggleHide(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
