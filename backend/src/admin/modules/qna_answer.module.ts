import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QnA_AnswerEntity } from 'src/entites/qna_answer.entity';
import { QnA_AnswerService } from '../services/qna_answer.service';
import { AdminEntity } from 'src/entites/admin.entity';
import { QnA_AdminController } from '../controller/qna_answer.controller';
import { QnAEntity } from 'src/entites/qna.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity, QnA_AnswerEntity, QnAEntity]),
  ],
  controllers: [QnA_AdminController],
  providers: [QnA_AnswerService],
})
export class QnA_AnswerModule {}
