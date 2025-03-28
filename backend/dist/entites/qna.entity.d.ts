import { ProductEntity } from './product.entity';
import { QnA_AnswerEntity } from './qna_answer.entity';
import { Product_optionEntity } from './product_option.entity';
export declare class QnAEntity {
    qna_no: number;
    product_no: ProductEntity;
    option_id: Product_optionEntity;
    user_id: number;
    title: string;
    content: string;
    private: boolean;
    private_pwd: string;
    answer_yn: boolean;
    write_at: Date;
    qna_answer: QnA_AnswerEntity;
}
