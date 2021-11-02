import {ISendServiceFactory} from "@modules/event_products/factories/ISendServiceFactory";
import {OperationEnum} from "@modules/event_products/enums/OperationEnum";
import {ISendService} from "@modules/event_products/factories/ISendService";
import {inject, injectable} from "tsyringe";

@injectable()
class SendServiceFactory implements ISendServiceFactory {
    constructor(
        @inject('PostSendService')
        private postService: ISendService,
        @inject('DeleteSendService')
        private deleteService: ISendService,
    ) {
    }

    public factory(operation: OperationEnum): ISendService {
        switch (operation) {
            case OperationEnum.INSERT:
                return this.postService;
            case OperationEnum.DELETE:
                return this.deleteService;
            default:
                throw new Error("Operation has been supported yet!!!!");
        }
    }
}
export default SendServiceFactory;
