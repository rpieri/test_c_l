import {IProvider} from "@modules/event_products/providers/model/IProvider";

export interface IThirdPartyService {
    post(event: IProvider) : Promise<boolean>;
    delete(id: string) : Promise<boolean>;
}
