import { Repository } from 'typeorm';
import { Media } from '../../database/entities/Media.entity';
export declare class MediaService {
    private readonly mediaRepository;
    constructor(mediaRepository: Repository<Media>);
    create(file: Express.Multer.File): Promise<Media>;
    findOne(id: number): Promise<Media>;
}
