import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from 'src/entites/admin.entity';
import { QnAEntity } from 'src/entites/qna.entity';
import { QnA_AnswerEntity } from 'src/entites/qna_answer.entity';
import { Repository } from 'typeorm';
import { QnA_AnswerDto } from '../dto/qna_answer.dto';

@Injectable()
export class QnA_AnswerService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly admin: Repository<AdminEntity>,

    @InjectRepository(QnA_AnswerEntity)
    private readonly qna_answer: Repository<QnA_AnswerEntity>,

    @InjectRepository(QnAEntity)
    private readonly qna: Repository<QnAEntity>,
  ) {}

  async all_qna() {
    try {
      const qna_list = await this.qna.find({ relations: ['product_no'] });
      console.log(qna_list);

      const qna_answer_yn = qna_list.map((item) => ({
        ...item,
        answer_yn: item.answer_yn === true ? '답변 완료' : '답변 대기 중',
      }));

      return qna_answer_yn;
    } catch (error) {
      console.error(error);
    }
  }

  async select_qna(qna_no: number) {
    try {
      const qna = await this.qna.findOne({ where: { qna_no: qna_no } });

      if (!qna) {
        throw new BadRequestException(
          '존재하지 않는 게시글입니다. 다시 확인해 주세요.',
        );
      }

      return { success: true, result: qna };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async checkAdmin(admin_no: number) {
    try {
      const findAdmin = await this.admin.findOne({
        where: { admin_id: admin_no },
      });

      if (!findAdmin) {
        throw new BadRequestException(
          '존재하지 않는 관리자입니다. 다시 확인해 주세요.',
        );
      }

      if (findAdmin.role !== 'admin') {
        throw new BadRequestException('답변 권한이 없는 관리자 계정입니다.');
      }

      return { check: true };
    } catch (error) {
      return { check: false, message: error.message };
    }
  }

  async admin_qna_answer(qna_answerDto: QnA_AnswerDto) {
    try {
      const answer = await this.qna_answer.create(qna_answerDto);
      const saveAnswer = await this.qna_answer.save(answer);

      if (saveAnswer) {
        await this.qna.update(qna_answerDto.qna_no, { answer_yn: true });
      }

      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
}
