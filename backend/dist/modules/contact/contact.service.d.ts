import { Repository } from 'typeorm';
import { ContactMessage } from '../../database/entities/ContactMessage.entity';
export declare class ContactService {
    private readonly contactRepository;
    constructor(contactRepository: Repository<ContactMessage>);
    findAll(): Promise<ContactMessage[]>;
    create(contactData: Partial<ContactMessage>): Promise<ContactMessage>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
