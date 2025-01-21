export declare class InsertOrderDto {
    user_id: number;
    product_no: number;
    quantity: number;
    order_state: string;
    refund_reason?: string;
    address_no: number;
    payment_method: string;
    total_price: number;
}
export declare class CartOrderDto {
    user_id: number;
    product_no: number[];
    quantity: number;
    order_state: string;
    refund_reason?: string;
    address_no: number;
    payment_method: string;
    total_price: number;
}
