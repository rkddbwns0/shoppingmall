import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QnAEntity } from './qna.entity';
import { AdminEntity } from './admin.entity';

@Entity('qna_answer')
export class QnA_AnswerEntity {
  @PrimaryGeneratedColumn()
  qna_answer_no: number;

  @ManyToOne(() => AdminEntity, (admin) => admin.admin_id)
  @JoinColumn({ name: 'admin_no' })
  admin_no: number;

  @ManyToOne(() => QnAEntity, (qna) => qna.qna_no, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'qna_no' })
  qna_no: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 1000,
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
  })
  contents: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  write_at: Date;
}
