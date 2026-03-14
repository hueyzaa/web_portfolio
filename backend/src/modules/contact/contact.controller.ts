import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactMessage } from '../../database/entities/ContactMessage.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.contactService.findAll();
  }

  @Post()
  create(@Body() contactData: Partial<ContactMessage>) {
    return this.contactService.create(contactData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.remove(id);
  }
}
