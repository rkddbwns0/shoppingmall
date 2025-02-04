import { ProductEntity } from 'src/entites/product.entity';
export declare class InsertQnADto {
    product_no: ProductEntity;
    user_id: number;
    title: string;
    content: string;
    private: string;
    private_pwd: string;
}
