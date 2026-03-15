import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // PUBLIC APIs
  @Get('posts')
  getPublicPosts() {
    return this.postsService.getPublicPosts();
  }

  @Get('posts/:slug')
  getPublicPost(@Param('slug') slug: string) {
    return this.postsService.getPublicPostBySlug(slug);
  }

  // ADMIN APIs
  @UseGuards(JwtAuthGuard)
  @Get('admin/posts')
  findAll() {
    return this.postsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin/posts')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/posts/:id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/posts/:id/publish')
  publish(@Param('id') id: string) {
    return this.postsService.publish(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/posts/:id/unpublish')
  unpublish(@Param('id') id: string) {
    return this.postsService.unpublish(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admin/posts/:id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
