import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Setting } from '../../database/entities/Setting.entity';
export declare class SettingsService implements OnModuleInit {
    private readonly settingRepository;
    constructor(settingRepository: Repository<Setting>);
    onModuleInit(): Promise<void>;
    findAll(): Promise<{}>;
    updateMany(settings: Record<string, string>): Promise<{}>;
    findByGroup(group: string): Promise<Setting[]>;
}
