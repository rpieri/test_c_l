import "reflect-metadata"
import {ISendService} from "@modules/event_products/factories/ISendService";
import {ISendServiceFactory} from "@modules/event_products/factories/ISendServiceFactory";
import {IThirdPartyService} from "@modules/event_products/providers/IThirdPartyService";
import {IEventProductRepository} from "@modules/event_products/domain/repositories/IEventProductRepository";
import {IUpdateEventProductService} from "@modules/event_products/services/IUpdateEventProductService";
import ThirdPartyServiceFake from "@modules/event_products/providers/fake/ThirdPartyServiceFake";
import EventProductRepositoryFake from "@modules/event_products/domain/repositories/fake/EventProductRepositoryFake";
import UpdateEventProductService from "@modules/event_products/services/UpdateEventProductService";
import DeleteSendService from "@modules/event_products/factories/DeleteSendService";
import PostSendService from "@modules/event_products/factories/PostSendService";
import SendServiceFactory from "@modules/event_products/factories/SendServiceFactory";
import {OperationEnum} from "@modules/event_products/enums/OperationEnum";

let thirdPartyService: IThirdPartyService;
let repository: IEventProductRepository;
let updateService: IUpdateEventProductService;
let deleteSendService: ISendService;
let postSendService: ISendService;
let factory: ISendServiceFactory;

describe('SendServiceFactory', () => {
   beforeAll(() => {
      thirdPartyService = new ThirdPartyServiceFake();
      repository = new EventProductRepositoryFake();
      updateService = new UpdateEventProductService(repository);
      deleteSendService = new DeleteSendService(thirdPartyService, updateService);
      postSendService = new PostSendService(thirdPartyService, updateService);
      factory = new SendServiceFactory(postSendService, deleteSendService);
   });

   it('should be able to return send service type post when the operation in INSERT', () => {
      const sendService = factory.factory(OperationEnum.INSERT);
      expect(sendService).toBeInstanceOf(PostSendService);
   });

   it('should be able to return send service type delete when the operation in DELETE', () => {
      const sendService = factory.factory(OperationEnum.DELETE);
      expect(sendService).toBeInstanceOf(DeleteSendService);
   });
});
