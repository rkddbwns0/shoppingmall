import { ProductEntity } from './product.entity';
import { QnA_AnswerEntity } from './qna_answer.entity';
export declare class QnAEntity {
    qna_no: number;
    product_no: ProductEntity;
    user_id: number;
    title: string;
    content: string;
    private: string;
    private_pwd: string;
    answer_yn: boolean;
    write_at: Date;
    qna_answer: QnA_AnswerEntity;
}
