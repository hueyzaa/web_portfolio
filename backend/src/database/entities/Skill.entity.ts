import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  icon: string;

  @Index()
  @Column({ type: 'int', default: 0 })
  level: number;
}
