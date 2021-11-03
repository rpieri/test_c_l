import "reflect-metadata"
import {IThirdPartyService} from "@modules/event_products/providers/IThirdPartyService";
import {IUpdateEventProductService} from "@modules/event_products/services/IUpdateEventProductService";
import {ISendService} from "@modules/event_products/factories/ISendService";
import ThirdPartyServiceFake from "@modules/event_products/providers/fake/ThirdPartyServiceFake";
import UpdateEventProductService from "@modules/event_products/services/UpdateEventProductService";
import {IEventProductRepository} from "@modules/event_products/domain/repositories/IEventProductRepository";
import EventProductRepositoryFake from "@modules/event_products/domain/repositories/fake/EventProductRepositoryFake";
import DeleteSendService from "@modules/event_products/factories/DeleteSendService";
import {OperationEnum} from "@modules/event_products/enums/OperationEnum";
import {v4 as uuid4} from "uuid"

let thirdPartyService: IThirdPartyService;
let repository: IEventProductRepository;
let updateService: IUpdateEventProductService;
let service: ISendService;

describe('DeleteSendService', () => {
    beforeEach(() => {
        thirdPartyService = new ThirdPartyServiceFake();
        repository = new EventProductRepositoryFake();
        updateService = new UpdateEventProductService(repository);
        service = new DeleteSendService(thirdPartyService, updateService);
    });

    it('should be able to send to third-party service the product was removed in the service', async () => {
        const event = await repository.create({
            name: 'Product 1',
            price: 20.20,
            quantity: 10,
            operation: OperationEnum.DELETE,
            product_id: uuid4()
        });
        await service.send(event);
        const eventFind = await repository.findById(event.id);

        expect(eventFind?.executed).toBeTruthy();
    });
});
