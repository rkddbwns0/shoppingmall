import { Cache } from 'cache-manager';
import { RegProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { ProductEntity } from 'src/entites/product.entity';
import { ProductCateogryEntity } from 'src/entites/product_categories.entity';
import { Product_optionEntity } from 'src/entites/product_option.entity';
import { Repository } from 'typeorm';
export declare class ProductService {
    private readonly productRepository;
    private readonly productCategoryRepository;
    private readonly product_optionRepository;
    private cacheManager;
    constructor(productRepository: Repository<ProductEntity>, productCategoryRepository: Repository<ProductCateogryEntity>, product_optionRepository: Repository<Product_optionEntity>, cacheManager: Cache);
    randomProduct(): Promise<ProductEntity[]>;
    selectProductCategory(category_id: number): Promise<ProductCateogryEntity[]>;
    selectProduct(product_category: number): Promise<ProductEntity[]>;
    selectOneProduct(product_id: number): Promise<any>;
    insertProduct(regProductDto: RegProductDto): Promise<{
        success: boolean;
    }>;
    updateProduct(updateProductDto: UpdateProductDto): Promise<{
        success: boolean;
    }>;
}
