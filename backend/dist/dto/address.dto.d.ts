export declare class InsertAddressDto {
    user_id: number;
    name: string;
    zip_code: string;
    address: string;
    detail_addr: string;
    default_addr: string;
    deliveryMsg: string;
}
export declare class UpdateAddressDto {
    address_no: number;
    user_id: number;
    default_addr: string;
}
export declare class DeleteAddressDto {
    address_no: number;
    user_id: number;
}
