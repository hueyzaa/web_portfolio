import { ContactService } from './contact.service';
import { ContactMessage } from '../../database/entities/ContactMessage.entity';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    findAll(): Promise<ContactMessage[]>;
    create(contactData: Partial<ContactMessage>): Promise<ContactMessage>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
