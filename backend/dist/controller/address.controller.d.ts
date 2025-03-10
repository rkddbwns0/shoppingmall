import { Response } from 'express';
import { DeleteAddressDto, InsertAddressDto, UpdateAddressDto } from 'src/dto/address.dto';
import { AddressService } from 'src/services/address.service';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    selectAddress(user_id: number, res: Response): Promise<void>;
    insertAddress(insertAddressDto: InsertAddressDto, res: Response): Promise<void>;
    updateAddress(updateAddressDto: UpdateAddressDto, res: Response): Promise<void>;
    DeleteAddressDto(deleteAddressDto: DeleteAddressDto, res: Response): Promise<void>;
}
