import { Entity, Column, OneToMany } from 'typeorm';
import { BaseModel } from './base.model';
import { Expense } from './expense.entity';
import { Split } from './split.entity';

@Entity()
export class User extends BaseModel {
  @Column({ unique: true })
  firebaseUID: string;

  @Column()
  name: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ unique: true, nullable: true })
  email: string | null;

  @OneToMany(() => Expense, (expense) => expense.paidBy)
  expenses: Expense[];

  @OneToMany(() => Split, (split) => split.user)
  splits: Split[];
}
