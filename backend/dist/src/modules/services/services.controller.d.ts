import { ServicesService } from './services.service';
import { Service } from '../../database/entities/Service.entity';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    findAll(): Promise<Service[]>;
    create(serviceData: Partial<Service>): Promise<Service>;
    update(id: number, serviceData: Partial<Service>): Promise<Service>;
    remove(id: number): Promise<Service>;
}
