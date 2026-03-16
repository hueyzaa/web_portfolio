import { ProfileService } from './profile.service';
import { Profile } from '../../database/entities/Profile.entity';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(): Promise<Profile | null>;
    updateProfile(data: Partial<Profile>): Promise<Partial<Profile> & Profile>;
}
