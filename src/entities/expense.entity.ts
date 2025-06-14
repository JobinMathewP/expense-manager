import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { BaseModel } from './base.model';
import { GroupActivity } from './group-activity.entity';
import { Split } from './split.entity';
import { Attachment } from './attachment.entity';
import { PaymentMethod } from 'src/enums/payment-method.enum';

@Entity()
export class Expense extends BaseModel {
  @Column()
  title: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ length: 3, default: 'INR' })
  currency: string;

  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @Column({ type: 'timestamp', nullable: false })
  date: Date; // Date and time of the expense (ISO 8601 format)

  @Index()
  @ManyToOne(() => User, { nullable: false })
  paidBy: User;

  @ManyToOne(() => GroupActivity, (groupActivity) => groupActivity.expenses, {
    nullable: true,
  })
  groupActivity: GroupActivity | null;

  @OneToMany(() => Split, (split) => split.expense)
  splits: Split[];

  @OneToMany(() => Attachment, (attachment) => attachment.expense)
  attachments: Attachment[];

  @Column({ type: 'text', nullable: true })
  note: string | null;
}
