import { ProductEntity } from './product.entity';
export declare class QnAEntity {
    qna_no: number;
    product_no: ProductEntity;
    user_id: number;
    title: string;
    content: string;
    private: string;
    private_pwd: string;
    write_at: Date;
}
