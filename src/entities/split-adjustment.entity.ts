import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseModel } from './base.model';
import { User } from './user.entity';
import { Split } from './split.entity';

@Entity()
export class SplitAdjustment extends BaseModel {
  @ManyToOne(() => User, { nullable: false })
  updatedBy: User;

  @ManyToOne(() => Split, { nullable: false })
  split: Split;

  @Column('decimal', { precision: 10, scale: 2 })
  oldAmount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  newAmount: number;

  @Column({ type: 'text', nullable: true })
  note: string | null;
}
