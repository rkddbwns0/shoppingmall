import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';
import { QnA_AnswerEntity } from './qna_answer.entity';
import { Product_optionEntity } from './product_option.entity';

@Entity('qna')
export class QnAEntity {
  @PrimaryGeneratedColumn()
  qna_no: number;

  @ManyToOne(() => ProductEntity, (product) => product.product_id)
  @JoinColumn({ name: 'product_no' })
  product_no: ProductEntity;

  @ManyToOne(() => Product_optionEntity, (product_option) => product_option.option_id)
  @JoinColumn({ name: 'option_id' })
  option_id: Product_optionEntity;

  @ManyToOne(() => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  title: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 1000,
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
  })
  content: string;

  @Column({ type: 'enum', enum: ['O', 'X'], default: 'X' })
  private: string;

  @Column({ type: 'varchar', nullable: true, length: 20 })
  private_pwd: string;

  @Column({ type: 'boolean', default: false })
  answer_yn: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  write_at: Date;

  @OneToMany(() => QnA_AnswerEntity, (qna_answer) => qna_answer.qna_no, {
    cascade: true,
  })
  qna_answer: QnA_AnswerEntity;
}
