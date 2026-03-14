import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UploadService } from './upload.service';
import { MediaService } from '../media/media.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly mediaService: MediaService,
  ) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('File upload failed', HttpStatus.BAD_REQUEST);
    }
    
    // Save to database as BLOB
    const media = await this.mediaService.create(file);
    
    return {
      url: `/media/${media.id}`,
      filename: media.filename,
      id: media.id,
    };
  }
}
