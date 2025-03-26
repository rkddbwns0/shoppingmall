import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertQnADto } from 'src/dto/qna.dto';
import { ProductEntity } from 'src/entites/product.entity';
import { QnAEntity } from 'src/entites/qna.entity';
import { UserEntity } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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
      if (insertQnADto.private === true && !insertQnADto.private_pwd) {
        throw new BadRequestException(
          '비밀글을 작성하기 위해서는 비밀번호를 등록해야 합니다.',
        );
      }

      if (insertQnADto.private === true) {
        const hashPassword = await  this.hashPrivatePwd(insertQnADto.private_pwd);
        insertQnADto.private_pwd = hashPassword;
      }

      const writeQnA = this.qnaRepository.create(insertQnADto);
      await this.qnaRepository.save(writeQnA);

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  private async hashPrivatePwd(private_pwd: string) {
    try {
        const hashPwd = await bcrypt.hash(private_pwd, 10);
        return hashPwd;
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async selectAllQnATitle(product_no: number) {
    try {
      const allQna = await this.qnaRepository
        .createQueryBuilder('qna')
        .leftJoinAndSelect('qna.product_no', 'product')
        .leftJoinAndSelect('qna.option_id', 'product_option')
        .select([
          'qna.title AS title',
          'qna.content AS content',
          'qna.private AS private',
          'qna.answer_yn AS answer_yn',
          'product.product_id AS product_id',
          'product.product_name AS product_name',
          'product_option.option_id AS option_id',
          'product_option.color AS color',
          'product_option.size AS size'
        ])
        .where('qna.product_no = :product_no', { product_no })
        .getRawMany();

      const qnaData = allQna.map((item) => ({
        ...item,
        title:
          item.private === 1 ? (item.title = '비밀글 입니다.') : item.title,
        answer_yn: item.answer_yn === 1 ? '답변 완료' : '답변 대기 중',
      }));

      if (!qnaData) {
        return null;
      }

      return { data: qnaData };
    } catch (error) {
      console.error(error);
    }
  }

  async myQnA(user_id: number) {
    try {
      const myQnA = await  this.qnaRepository
        .createQueryBuilder('qna')
        .leftJoinAndSelect('qna.product_no', 'product')
        .leftJoinAndSelect('qna.option_id', 'product_option')
        .leftJoinAndSelect('qna.user_id', 'user')
        .select([
          'qna.qna_no AS qna_no',
          'qna.title AS title',
          'qna.content AS content',
          'qna.write_at AS write_at',
          'product.product_name AS product_name',
          'product_option.color AS color',
          'product_option.size AS size',
          'user.name AS name',
          'user.email AS email',
        ])
        .where('qna.user_id = :user_id', {user_id})
        .getRawMany();
      
      if (!myQnA) {
        return null;
      }
      return myQnA;
    } catch (error) {
      console.error(error)
    }
  }

  async selectQnA(user_id: number, qna_no: number, pwd?: string) {
    try {
      const selectQnA = await this.qnaRepository.findOne({
        where: {user_id: user_id, qna_no: qna_no},
        select: ['private']
      })

      if (!selectQnA) {
        throw new BadRequestException('존재하지 않는 QnA입니다.')
      }

    } catch (error) {
      console.error(error)
    }
  }
}
