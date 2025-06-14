import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expense } from './expense.entity';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filePath: string;

  @Column()
  fileType: string;

  @ManyToOne(() => Expense, (expense) => expense.attachments, {
    nullable: false,
    cascade: ['remove'],
  })
  expense: Expense;
}
