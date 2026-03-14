import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from '../../database/entities/ContactMessage.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactMessage)
    private readonly contactRepository: Repository<ContactMessage>,
  ) {}

  findAll() {
    return this.contactRepository.find({ order: { createdAt: 'DESC' } });
  }

  create(contactData: Partial<ContactMessage>) {
    const contact = this.contactRepository.create(contactData);
    return this.contactRepository.save(contact);
  }

  async remove(id: number) {
    await this.contactRepository.delete(id);
    return { message: 'Message deleted' };
  }
}
