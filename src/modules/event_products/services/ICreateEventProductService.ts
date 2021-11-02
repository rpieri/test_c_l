import {IEventProduct} from "@modules/event_products/domain/models/IEventProduct";
import {ICreateEventProduct} from "@modules/event_products/domain/models/ICreateEventProduct";

export interface ICreateEventProductService {
    execute(dto: ICreateEventProduct): Promise<IEventProduct>
}