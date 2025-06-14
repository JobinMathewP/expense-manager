import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Expense } from './expense.entity';
import { BaseModel } from './base.model';
import { SplitAdjustment } from './split-adjustment.entity';
import { SplitType } from 'src/enums/split-type.enum';
import { SplitStatus } from 'src/enums/split-status.enum';

@Entity()
export class Split extends BaseModel {
  @Column({ type: 'enum', enum: SplitType, default: SplitType.EQUAL })
  splitType: SplitType;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  settledAmount: number;

  @Column({ type: 'enum', enum: SplitStatus, default: SplitStatus.PENDING })
  status: SplitStatus;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Expense, (expense) => expense.splits, { nullable: false })
  expense: Expense;

  @OneToMany(() => SplitAdjustment, (adjustment) => adjustment.split, {
    cascade: true,
  })
  adjustments: SplitAdjustment[];
}
