import {IUpdateEventProduct} from "@modules/event_products/domain/models/IUpdateEventProduct";

export interface IUpdateEventProductService {
    execute(dto: IUpdateEventProduct): Promise<void>
}
