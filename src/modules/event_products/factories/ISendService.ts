import {IEventProduct} from "@modules/event_products/domain/models/IEventProduct";

export interface ISendService {
    send(event: IEventProduct): Promise<void>;
}