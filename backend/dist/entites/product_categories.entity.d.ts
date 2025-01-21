import { ProductEntity } from './product.entity';
export declare class ProductCateogryEntity {
    category_id: number;
    name: string;
    description: string;
    parent_id: ProductCateogryEntity;
    children: ProductCateogryEntity[];
    product_category: ProductEntity[];
}
