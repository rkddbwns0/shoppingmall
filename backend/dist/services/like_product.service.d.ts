import { Press_likedDto } from 'src/dto/like_product.dto';
import { Like_ProductEntity } from 'src/entites/like_product.entity';
import { ProductEntity } from 'src/entites/product.entity';
import { UserEntity } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
export declare class Like_ProductService {
    private readonly user;
    private readonly product;
    private readonly like_product;
    constructor(user: Repository<UserEntity>, product: Repository<ProductEntity>, like_product: Repository<Like_ProductEntity>);
    checkData(press_likedDto: Press_likedDto): Promise<{
        check: boolean;
        message?: undefined;
    } | {
        check: boolean;
        message: any;
    }>;
    press_liked(press_likedDto: Press_likedDto): Promise<{
        success: boolean;
        message: any;
    }>;
}
