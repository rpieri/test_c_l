import {IEventProductRepository} from "@modules/event_products/domain/repositories/IEventProductRepository";
import {ICreateEventProduct} from "@modules/event_products/domain/models/ICreateEventProduct";
import EventProduct from "@modules/event_products/infra/typeorm/entities/EventProduct";
import {getRepository, Repository} from "typeorm";

class EventProductRepository implements IEventProductRepository {
    private readonly ormRepository: Repository<EventProduct>;

    constructor() {
        this.ormRepository = getRepository(EventProduct);
    }

    public async create({product_id, operation, name, price, quantity}: ICreateEventProduct): Promise<EventProduct> {
        const eventProduct = this.ormRepository.create({product_id, operation, executed: false, name, price, quantity});
        return this.save(eventProduct);
    }

    public async findAllByExecuted(): Promise<EventProduct[]> {
        const executed = false;
        return await this.ormRepository.find({
            where: {
                executed
            }
        });
    }

    public async save(eventProduct: EventProduct): Promise<EventProduct> {
        await this.ormRepository.save(eventProduct);
        return eventProduct;
    }

    public async findById(id: string): Promise<EventProduct | undefined> {
        return await this.ormRepository.findOne(id);
    }
}
export default EventProductRepository;
