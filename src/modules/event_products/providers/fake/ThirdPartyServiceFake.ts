import {IThirdPartyService} from "@modules/event_products/providers/IThirdPartyService";
import {IProvider} from "@modules/event_products/providers/model/IProvider";

class ThirdPartyServiceFake implements IThirdPartyService{
    public async delete(id: string): Promise<boolean> {
        if(typeof id !== undefined && id !== "" && id !== null) {
            return true;
        }
        throw new Error();
    }

    public async post({id, name, price, quantity}: IProvider): Promise<boolean> {
        if(typeof id !== undefined && id !== "" && id !== null) {
            return true;
        }
        throw new Error();
    }
}
export default ThirdPartyServiceFake;
