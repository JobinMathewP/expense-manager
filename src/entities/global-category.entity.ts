import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GlobalCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;
}
