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
        data: any[];
    }>;
    myQnA(user_id: number): Promise<any[]>;
    selectQnA(user_id: number, qna_no: number, pwd?: string): Promise<void>;
}
