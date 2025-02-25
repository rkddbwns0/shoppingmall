import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_token')
export class UserTokenEntity {
  @PrimaryGeneratedColumn()
  token_id: number;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  token: string;

  @Column({ type: 'timestamp', nullable: false })
  expires_at: Timestamp;
}
