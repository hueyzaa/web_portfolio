import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import type { Response } from 'express';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get(':id')
  async getMedia(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const media = await this.mediaService.findOne(id);

    res.setHeader('Content-Type', media.mimetype);
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${media.filename}"`,
    );
    res.send(media.data);
  }
}
