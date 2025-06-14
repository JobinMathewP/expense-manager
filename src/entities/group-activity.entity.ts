import {
  Entity,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Expense } from './expense.entity';
import { BaseModel } from './base.model';

@Entity()
export class GroupActivity extends BaseModel {
  @Column()
  name: string;

  @ManyToOne(() => User, { nullable: false })
  createdBy: User;

  @ManyToMany(() => User)
  @JoinTable()
  members: User[];

  @OneToMany(() => Expense, (expense) => expense.groupActivity, {
    cascade: true,
  })
  expenses: Expense[];
}
