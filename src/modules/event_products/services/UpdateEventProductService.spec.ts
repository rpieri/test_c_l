import {IEventProductRepository} from "@modules/event_products/domain/repositories/IEventProductRepository";
import {IUpdateEventProductService} from "@modules/event_products/services/IUpdateEventProductService";
import EventProductRepositoryFake from "@modules/event_products/domain/repositories/fake/EventProductRepositoryFake";
import UpdateEventProductService from "@modules/event_products/services/UpdateEventProductService";
import {v4 as uuid4} from "uuid"
import {OperationEnum} from "@modules/event_products/enums/OperationEnum";

let eventProductRepositoryFake: IEventProductRepository;
let service: IUpdateEventProductService;

describe('UpdateEventProductService', () => {
    beforeEach(() => {
        eventProductRepositoryFake = new EventProductRepositoryFake();
        service = new UpdateEventProductService(eventProductRepositoryFake);
    })

    it('should be able to update an event of product', async () => {
       const event =  await eventProductRepositoryFake.create({product_id: uuid4(), price: 20, quantity: 10, operation: OperationEnum.INSERT, name: 'Product 1'});
       await service.execute({id: event.id});
       const eventUpdated = await eventProductRepositoryFake.findById(event.id);

       expect(eventUpdated?.executed).toBeTruthy();
    });

    it('should be able to update an event of product', async () => {
        const event =  await eventProductRepositoryFake.create({product_id: uuid4(), price: 20, quantity: 10, operation: OperationEnum.INSERT, name: 'Product 1'});
        await service.execute({id: uuid4()});
        const eventUpdated = await eventProductRepositoryFake.findById(event.id);

        expect(eventUpdated?.executed).toBeFalsy();
    });
});
