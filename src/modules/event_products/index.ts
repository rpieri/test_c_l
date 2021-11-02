import {container} from "tsyringe";
import {IEventProductRepository} from "@modules/event_products/domain/repositories/IEventProductRepository";
import EventProductRepository from "@modules/event_products/infra/typeorm/repositories/EventProductRepository";
import {ICreateEventProductService} from "@modules/event_products/services/ICreateEventProductService";
import CreateEventProductService from "@modules/event_products/services/CreateEventProductService";
import {IThirdPartyService} from "@modules/event_products/providers/IThirdPartyService";
import ThirdPartyService from "@modules/event_products/providers/ThirdPartyService";
import {IUpdateEventProductService} from "@modules/event_products/services/IUpdateEventProductService";
import UpdateEventProductService from "@modules/event_products/services/UpdateEventProductService";
import {ISendService} from "@modules/event_products/factories/ISendService";
import PostSendService from "@modules/event_products/factories/PostSendService";
import DeleteSendService from "@modules/event_products/factories/DeleteSendService";
import {ISendServiceFactory} from "@modules/event_products/factories/ISendServiceFactory";
import SendServiceFactory from "@modules/event_products/factories/SendServiceFactory";
import {IIntegrateThirdPartyService} from "@modules/event_products/services/IIntegrateThirdPartyService";
import IntegrateThirdPartyService from "@modules/event_products/services/IntegrateThirdPartyService";


container.registerSingleton<IEventProductRepository>(
    'EventProductRepository',
    EventProductRepository,
);

container.registerSingleton<ICreateEventProductService>(
    'CreateEventProductService',
    CreateEventProductService,
);

container.registerSingleton<IThirdPartyService>(
    'ThirdPartyService',
    ThirdPartyService,
);

container.registerSingleton<IUpdateEventProductService>(
    'UpdateEventProductService',
    UpdateEventProductService,
);

container.registerSingleton<ISendService>(
    'PostSendService',
    PostSendService,
);

container.registerSingleton<ISendService>(
    'DeleteSendService',
    DeleteSendService,
);

container.registerSingleton<ISendServiceFactory>(
    'SendServiceFactory',
    SendServiceFactory,
);

container.registerSingleton<IIntegrateThirdPartyService>(
    'IntegrateThirdPartyService',
    IntegrateThirdPartyService,
);

