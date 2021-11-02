import {IEventProduct} from "@modules/event_products/domain/models/IEventProduct";
import {ISendService} from "@modules/event_products/factories/ISendService";
import {OperationEnum} from "@modules/event_products/enums/OperationEnum";

export interface ISendServiceFactory {
    factory(operation: OperationEnum): ISendService;
}
