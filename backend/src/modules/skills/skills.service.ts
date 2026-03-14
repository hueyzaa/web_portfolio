import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from '../../database/entities/Skill.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  findAll() {
    return this.skillRepository.find();
  }

  create(skillData: Partial<Skill>) {
    const skill = this.skillRepository.create(skillData);
    return this.skillRepository.save(skill);
  }

  async remove(id: number) {
    const skill = await this.skillRepository.findOne({ where: { id } });
    if (!skill) throw new NotFoundException('Skill not found');
    return this.skillRepository.remove(skill);
  }

  async update(id: number, skillData: Partial<Skill>) {
    const skill = await this.skillRepository.findOne({ where: { id } });
    if (!skill) throw new NotFoundException('Skill not found');
    Object.assign(skill, skillData);
    return this.skillRepository.save(skill);
  }
}
