import { Injectable } from '@nestjs/common';
import { memoryStorage } from 'multer';

@Injectable()
export class UploadService {
  getMulterOptions() {
    return {
      storage: memoryStorage(),
      fileFilter: (
        req: any,
        file: { originalname: string },
        callback: (error: Error | null, acceptFile: boolean) => void,
      ) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    };
  }
}
