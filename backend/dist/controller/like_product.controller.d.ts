import { Response } from 'express';
import { Press_likedDto } from 'src/dto/like_product.dto';
import { Like_ProductService } from 'src/services/like_product.service';
export declare class Like_ProductController {
    private readonly like_productService;
    constructor(like_productService: Like_ProductService);
    press_liked(press_likedDto: Press_likedDto, res: Response): Promise<void>;
}
