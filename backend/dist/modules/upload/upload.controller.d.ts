import { UploadService } from './upload.service';
import { MediaService } from '../media/media.service';
export declare class UploadController {
    private readonly uploadService;
    private readonly mediaService;
    constructor(uploadService: UploadService, mediaService: MediaService);
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
        filename: string;
        id: number;
    }>;
}
