import {IUpdateEventProductService} from "@modules/event_products/services/IUpdateEventProductService";
import {IUpdateEventProduct} from "@modules/event_products/domain/models/IUpdateEventProduct";
import {inject, injectable} from "tsyringe";
import {IEventProductRepository} from "@modules/event_products/domain/repositories/IEventProductRepository";

@injectable()
class UpdateEventProductService implements IUpdateEventProductService{
    constructor(
        @inject('EventProductRepository')
        private repository : IEventProductRepository) {
    }
    public async execute({id}: IUpdateEventProduct): Promise<void> {
        const eventProduct = await this.repository.findById(id);
        if(eventProduct !== undefined){
            eventProduct.executed = true;
            eventProduct.integrated_at = new Date();
            await this.repository.save(eventProduct)
        }
    }
}

export default UpdateEventProductService;
