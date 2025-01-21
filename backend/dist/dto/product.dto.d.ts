import { Gender } from 'src/components/product_enum';
export declare class RegProductDto {
    product_category: number;
    product_name: string;
    product_content: string;
    gender: Gender;
    size: string;
    color: string;
    price: number;
    sale_price: number;
    stock: number;
}
export declare class UpdateProductDto {
    product_id: number;
    product_content: string;
    price: number;
    sale_price: number;
    stock: number;
}
