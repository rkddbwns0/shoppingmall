import { Response } from 'express';
import { RegProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { ProductService } from 'src/services/product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    selectProductCategory(category_id: number): Promise<import("../entites/product_categories.entity").ProductCateogryEntity[]>;
    selectProduct(product_category: number): Promise<import("../entites/product.entity").ProductEntity[]>;
    insertProduct(regProductDto: RegProductDto, res: Response): Promise<void>;
    updateProduct(updateProductDto: UpdateProductDto, res: Response): Promise<void>;
}
