import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Service } from '../../database/entities/Service.entity';
export declare class ServicesService implements OnModuleInit {
    private readonly serviceRepository;
    constructor(serviceRepository: Repository<Service>);
    onModuleInit(): Promise<void>;
    findAll(): Promise<Service[]>;
    create(serviceData: Partial<Service>): Promise<Service>;
    update(id: number, serviceData: Partial<Service>): Promise<Service>;
    remove(id: number): Promise<Service>;
}
