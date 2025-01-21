import { Response } from 'express';
import { InsertOrderDto } from 'src/dto/order.dto';
import { OrderService } from 'src/services/order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    insertOrder(insertOrderDto: InsertOrderDto, res: Response): Promise<void>;
}
