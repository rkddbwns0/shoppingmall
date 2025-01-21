import { RegProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { ProductEntity } from 'src/entites/product.entity';
import { ProductCateogryEntity } from 'src/entites/product_categories.entity';
import { Repository } from 'typeorm';
export declare class ProductService {
    private readonly productRepository;
    private readonly productCategoryRepository;
    constructor(productRepository: Repository<ProductEntity>, productCategoryRepository: Repository<ProductCateogryEntity>);
    selectProductCategory(category_id: number): Promise<ProductCateogryEntity[]>;
    selectProduct(product_category: number): Promise<ProductEntity[]>;
    insertProduct(regProductDto: RegProductDto): Promise<{
        success: boolean;
    }>;
    updateProduct(updateProductDto: UpdateProductDto): Promise<{
        success: boolean;
    }>;
}
