import type { Response } from 'express';
import { MediaService } from './media.service';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    getMedia(id: number, res: Response): Promise<void>;
}
