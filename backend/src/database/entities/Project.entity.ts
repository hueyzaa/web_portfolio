import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Category } from './Category.entity';
import { Expose } from 'class-transformer';

@Entity('projects')
export class Project {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Expose()
  @Column({ type: 'text', nullable: true })
  description: string;

  @Expose()
  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Expose()
  @ManyToOne(() => Category, (category) => category.projects, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category | null;

  @Expose()
  @Column({ type: 'longtext', nullable: true })
  content: string;

  @Expose()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
