import { AdminEntity } from 'src/entites/admin.entity';
import { QnAEntity } from 'src/entites/qna.entity';
import { QnA_AnswerEntity } from 'src/entites/qna_answer.entity';
import { Repository } from 'typeorm';
import { QnA_AnswerDto } from '../dto/qna_answer.dto';
export declare class QnA_AnswerService {
    private readonly admin;
    private readonly qna_answer;
    private readonly qna;
    constructor(admin: Repository<AdminEntity>, qna_answer: Repository<QnA_AnswerEntity>, qna: Repository<QnAEntity>);
    all_qna(): Promise<{
        answer_yn: string;
        qna_no: number;
        product_no: import("../../entites/product.entity").ProductEntity;
        option_id: import("../../entites/product_option.entity").Product_optionEntity;
        user_id: number;
        title: string;
        content: string;
        private: string;
        private_pwd: string;
        write_at: Date;
        qna_answer: QnA_AnswerEntity;
    }[]>;
    select_qna(qna_no: number): Promise<{
        success: boolean;
        result: QnAEntity;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
        result?: undefined;
    }>;
    checkAdmin(admin_no: number): Promise<{
        check: boolean;
        message?: undefined;
    } | {
        check: boolean;
        message: any;
    }>;
    admin_qna_answer(qna_answerDto: QnA_AnswerDto): Promise<{
        success: boolean;
    }>;
}
