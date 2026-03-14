import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Profile } from '../../database/entities/Profile.entity';
export declare class ProfileService implements OnModuleInit {
    private profileRepository;
    constructor(profileRepository: Repository<Profile>);
    onModuleInit(): Promise<void>;
    getProfile(): Promise<Profile | null>;
    updateProfile(data: Partial<Profile>): Promise<Partial<Profile> & Profile>;
}
