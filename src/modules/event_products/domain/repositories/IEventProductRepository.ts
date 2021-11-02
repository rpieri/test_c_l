import {IEventProduct} from "@modules/event_products/domain/models/IEventProduct";
import {ICreateEventProduct} from "@modules/event_products/domain/models/ICreateEventProduct";

export  interface IEventProductRepository {
    findById(id: string): Promise<IEventProduct | undefined>;
    findAllByExecuted(): Promise<IEventProduct[]>;
    create(data: ICreateEventProduct): Promise<IEventProduct>;
    save(eventProduct: IEventProduct) : Promise<IEventProduct>;
}
