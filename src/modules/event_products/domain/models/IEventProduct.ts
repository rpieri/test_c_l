import {Column, CreateDateColumn} from "typeorm";
import {OperationEnum} from "@modules/event_products/enums/OperationEnum";

export interface IEventProduct {
    id: string;
    product_id: string;
    operation: OperationEnum;
    executed: boolean;
    created_at: Date;
    integrated_at?: Date;
    name: string;
    price: number;
    quantity: number;
}