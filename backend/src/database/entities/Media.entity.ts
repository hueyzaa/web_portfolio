import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  filename: string;

  @Column({ type: 'varchar', length: 100 })
  mimetype: string;

  @Column({ type: 'longblob' })
  data: Buffer;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
