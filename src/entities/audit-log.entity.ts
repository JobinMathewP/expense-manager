import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseModel } from './base.model';
import { User } from './user.entity';

@Entity()
export class AuditLog extends BaseModel {
  @Column()
  entityName: string;

  @Column()
  entityId: string;

  @Column({ type: 'jsonb' })
  previousValues: any;

  @Column({ type: 'jsonb' })
  newValues: any;

  @ManyToOne(() => User, { nullable: false })
  modifiedBy: User;

  @Column({ type: 'timestamp' })
  modifiedAt: Date;

  @Column({ type: 'text', nullable: true })
  action: string | null;
}
