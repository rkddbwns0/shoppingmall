import { InsertQnADto } from 'src/dto/qna.dto';
import { ProductEntity } from 'src/entites/product.entity';
import { QnAEntity } from 'src/entites/qna.entity';
import { UserEntity } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
export declare class QnAService {
    private readonly userRepository;
    private readonly productRepository;
    private readonly qnaRepository;
    constructor(userRepository: Repository<UserEntity>, productRepository: Repository<ProductEntity>, qnaRepository: Repository<QnAEntity>);
    insertQnA(insertQnADto: InsertQnADto): Promise<{
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
    }>;
    private hashPrivatePwd;
    selectAllQnATitle(product_no: number): Promise<{
        data: {
            title: string;
            answer_yn: string;
            qna_no: number;
            product_no: ProductEntity;
            option_id: import("../entites/product_option.entity").Product_optionEntity;
            user_id: number;
            content: string;
            private: string;
            private_pwd: string;
            write_at: Date;
            qna_answer: import("../entites/qna_answer.entity").QnA_AnswerEntity;
        }[];
    }>;
}
