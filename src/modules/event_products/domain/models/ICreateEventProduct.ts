import {OperationEnum} from "@modules/event_products/enums/OperationEnum";

export interface ICreateEventProduct {
    product_id: string;
    operation: OperationEnum;
    name: string;
    price: number;
    quantity: number;
}