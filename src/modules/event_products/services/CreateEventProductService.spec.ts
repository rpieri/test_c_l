import {IEventProductRepository} from "@modules/event_products/domain/repositories/IEventProductRepository";
import {ICreateEventProductService} from "@modules/event_products/services/ICreateEventProductService";
import EventProductRepositoryFake from "@modules/event_products/domain/repositories/fake/EventProductRepositoryFake";
import CreateEventProductService from "@modules/event_products/services/CreateEventProductService";
import {v4 as uuid4} from "uuid"
import {OperationEnum} from "@modules/event_products/enums/OperationEnum";

let eventProductRepositoryFake: IEventProductRepository;
let service: ICreateEventProductService;

describe('CreateEventProductService', () =>{
    beforeEach(() => {
        eventProductRepositoryFake = new EventProductRepositoryFake();
        service = new CreateEventProductService(eventProductRepositoryFake);
    })

    it('should be able to create a new event of product', async () => {
        const event = await service.execute({
            name: 'Product 1',
            price: 20.33,
            quantity: 30,
            product_id: uuid4(),
            operation: OperationEnum.INSERT
        });
        expect(event).toHaveProperty('id');
    });
});
