import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseModel } from './base.model';

@Entity()
export class Category extends BaseModel {
  @Column()
  name: string;

  @ManyToOne(() => User, { nullable: false })
  user: User;
}
