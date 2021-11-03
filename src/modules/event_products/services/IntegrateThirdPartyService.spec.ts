import {IEventProductRepository} from "@modules/event_products/domain/repositories/IEventProductRepository";
import {IThirdPartyService} from "@modules/event_products/providers/IThirdPartyService";
import {IUpdateEventProductService} from "@modules/event_products/services/IUpdateEventProductService";
import {ISendService} from "@modules/event_products/factories/ISendService";
import {ISendServiceFactory} from "@modules/event_products/factories/ISendServiceFactory";
import {IIntegrateThirdPartyService} from "@modules/event_products/services/IIntegrateThirdPartyService";
import ThirdPartyServiceFake from "@modules/event_products/providers/fake/ThirdPartyServiceFake";
import EventProductRepositoryFake from "@modules/event_products/domain/repositories/fake/EventProductRepositoryFake";
import UpdateEventProductService from "@modules/event_products/services/UpdateEventProductService";
import DeleteSendService from "@modules/event_products/factories/DeleteSendService";
import PostSendService from "@modules/event_products/factories/PostSendService";
import SendServiceFactory from "@modules/event_products/factories/SendServiceFactory";
import ProductRepositoryFake from "@modules/products/domain/repositories/fake/ProductRepositoryFake";
import IntegrateThirdPartyService from "@modules/event_products/services/IntegrateThirdPartyService";
import {OperationEnum} from "@modules/event_products/enums/OperationEnum";
import {v4 as uuid4} from "uuid";

let thirdPartyService: IThirdPartyService;
let repository: IEventProductRepository;
let updateService: IUpdateEventProductService;
let deleteSendService: ISendService;
let postSendService: ISendService;
let factory: ISendServiceFactory;
let integrateThirdPartyService: IIntegrateThirdPartyService;


describe('IntegrateThirdPartyService', () => {
    beforeEach(() => {
        thirdPartyService = new ThirdPartyServiceFake();
        repository = new EventProductRepositoryFake();
        updateService = new UpdateEventProductService(repository);
        deleteSendService = new DeleteSendService(thirdPartyService, updateService);
        postSendService = new PostSendService(thirdPartyService, updateService);
        factory = new SendServiceFactory(postSendService, deleteSendService);
        integrateThirdPartyService = new IntegrateThirdPartyService(repository, factory)
    });

    it('should be able to send information of products to third-party service', async () => {
        const event = await repository.create({
            name: 'Product 1',
            price: 20.20,
            quantity: 10,
            operation: OperationEnum.INSERT,
            product_id: uuid4()
        });

        await integrateThirdPartyService.execute();
        const eventFind = await repository.findById(event.id);

        expect(eventFind?.executed).toBeTruthy();
    });
});
