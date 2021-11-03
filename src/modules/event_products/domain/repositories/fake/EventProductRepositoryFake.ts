import {IEventProductRepository} from "@modules/event_products/domain/repositories/IEventProductRepository";
import {ICreateEventProduct} from "@modules/event_products/domain/models/ICreateEventProduct";
import EventProduct from "@modules/event_products/infra/typeorm/entities/EventProduct";
import {v4 as uuid4} from "uuid"

class EventProductRepositoryFake implements IEventProductRepository {
    private eventProducts: EventProduct[] = [];
    public async create({name, price,quantity, operation, product_id}: ICreateEventProduct): Promise<EventProduct> {
        const event = new EventProduct();
        event.id = uuid4();
        event.product_id = product_id;
        event.price = price;
        event.quantity = quantity;
        event.name = name;
        event.operation = operation;

        this.eventProducts.push(event);
        return event;
    }

    public async findAllByExecuted(): Promise<EventProduct[]> {
        return this.eventProducts.filter(x => !x.executed);
    }

    public async findById(id: string): Promise<EventProduct | undefined> {
        return this.eventProducts.find(x => x.id === id);
    }

    public async save(eventProduct: EventProduct): Promise<EventProduct> {
        const index = this.eventProducts.findIndex(x => x.id === eventProduct.id);
        this.eventProducts[index] = eventProduct;
        return eventProduct;
    }
}
export default EventProductRepositoryFake;
