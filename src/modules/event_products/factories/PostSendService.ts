import {ISendService} from "@modules/event_products/factories/ISendService";
import {IEventProduct} from "@modules/event_products/domain/models/IEventProduct";
import {inject, injectable} from "tsyringe";
import {IThirdPartyService} from "@modules/event_products/providers/IThirdPartyService";
import {IUpdateEventProductService} from "@modules/event_products/services/IUpdateEventProductService";

@injectable()
class PostSendService implements ISendService {
    constructor(
        @inject('ThirdPartyService')
        private service: IThirdPartyService,
        @inject('UpdateEventProductService')
        private updateService: IUpdateEventProductService) {
    }

    public async send({name, price, quantity, product_id, id}: IEventProduct): Promise<void> {
        const result = await this.service.post({name, id:product_id, price, quantity});
        if(result){
            await this.updateService.execute({id});
        }
    }
}

export default PostSendService;
