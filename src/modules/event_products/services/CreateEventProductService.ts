import {inject, injectable} from "tsyringe";
import {IEventProductRepository} from "@modules/event_products/domain/repositories/IEventProductRepository";
import {ICreateEventProduct} from "@modules/event_products/domain/models/ICreateEventProduct";
import EventProduct from "@modules/event_products/infra/typeorm/entities/EventProduct";
import {ICreateEventProductService} from "@modules/event_products/services/ICreateEventProductService";

@injectable()
class CreateEventProductService implements ICreateEventProductService{
    constructor(
        @inject('EventProductRepository')
        private eventProductRepository: IEventProductRepository,
    ) {}

    public async execute({product_id, operation, name, price, quantity}: ICreateEventProduct): Promise<EventProduct> {
        return await this.eventProductRepository.create({product_id, operation, name, price, quantity});
    }
}
export default CreateEventProductService;
