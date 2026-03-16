import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    findAll(): Promise<{}>;
    update(settings: Record<string, string>): Promise<{}>;
}
