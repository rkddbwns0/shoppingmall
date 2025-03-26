import { ProductEntity } from 'src/entites/product.entity';
import { Product_optionEntity } from '../entites/product_option.entity';
export declare class InsertQnADto {
    product_no: ProductEntity;
    option_id: Product_optionEntity;
    user_id: number;
    title: string;
    content: string;
    private: boolean;
    private_pwd: string;
}
