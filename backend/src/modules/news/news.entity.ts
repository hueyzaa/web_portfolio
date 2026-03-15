import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  thumbnail: string;

  @Index({ unique: true })
  @Column({ length: 500 })
  url: string;

  @Column({ nullable: true })
  source: string;

  @Column({ nullable: true })
  category: string; // Technology, Design, Branding

  @Column({ type: 'timestamp', nullable: true })
  published_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: false })
  is_featured: boolean;

  @Column({ default: false })
  is_hidden: boolean;
}
