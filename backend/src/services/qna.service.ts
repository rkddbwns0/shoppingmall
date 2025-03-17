import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertQnADto } from 'src/dto/qna.dto';
import { ProductEntity } from 'src/entites/product.entity';
import { QnAEntity } from 'src/entites/qna.entity';
import { UserEntity } from 'src/entites/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QnAService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(QnAEntity)
    private readonly qnaRepository: Repository<QnAEntity>,
  ) {}

  async insertQnA(insertQnADto: InsertQnADto) {
    try {
      if (insertQnADto.private === 'O' && !insertQnADto.private_pwd) {
        throw new BadRequestException(
          '비밀글을 작성하기 위해서는 비밀번호를 등록해야 합니다.',
        );
      }

      const writeQnA = this.qnaRepository.create(insertQnADto);
      await this.qnaRepository.save(writeQnA);

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async selectAllQnATitle(product_no: number) {
    try {
      const allQna = await this.qnaRepository.find({
        where: { product_no: { product_id: product_no } },
        select: ['qna_no', 'title', 'private', 'answer_yn'],
        relations: ['product_no'],
      });

      console.log(allQna);

      const qnaData = allQna.map((item) => ({
        ...item,
        title:
          item.private === 'O' ? (item.title = '비밀글 입니다.') : item.title,
        answer_yn: item.answer_yn === true ? '답변 완료' : '답변 대기 중',
      }));

      if (!qnaData) {
        return null;
      }

      return { data: qnaData };
    } catch (error) {
      console.error(error);
    }
  }
}
