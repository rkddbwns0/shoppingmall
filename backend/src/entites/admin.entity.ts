import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QnA_AnswerEntity } from './qna_answer.entity';

@Entity('admin')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  admin_id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'enum', enum: ['admin', 'moderator'], default: 'admin' })
  role: string;

  @Column({
    type: 'datetime',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_at: Date;

  @Column({ type: 'datetime', nullable: true })
  update_at: Date;

  @OneToMany(() => QnA_AnswerEntity, (qna_answer) => qna_answer.admin_no)
  qna_answer: QnA_AnswerEntity;
}
