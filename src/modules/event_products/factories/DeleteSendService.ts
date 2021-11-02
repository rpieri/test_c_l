import {ISendService} from "@modules/event_products/factories/ISendService";
import {IEventProduct} from "@modules/event_products/domain/models/IEventProduct";
import {inject, injectable} from "tsyringe";
import {IThirdPartyService} from "@modules/event_products/providers/IThirdPartyService";
import {IUpdateEventProductService} from "@modules/event_products/services/IUpdateEventProductService";

@injectable()
class DeleteSendService implements ISendService{
    constructor(
        @inject('ThirdPartyService')
        private service: IThirdPartyService,
        @inject('UpdateEventProductService')
        private updateService: IUpdateEventProductService
    ) {
    }
    public async send({id,product_id}: IEventProduct): Promise<void> {
        const result = await this.service.delete(product_id);
        if(result){
            await this.updateService.execute({id});
        }
    }
}

export default DeleteSendService;
