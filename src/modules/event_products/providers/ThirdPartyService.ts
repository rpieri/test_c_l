import {IThirdPartyService} from "@modules/event_products/providers/IThirdPartyService";
import {IProvider} from "@modules/event_products/providers/model/IProvider";
import api from "@shared/http/api";

class ThirdPartyService implements IThirdPartyService {
    public async post({name, id, price, quantity}: IProvider): Promise<boolean> {
        try {
            const response = await api.post("", {id, name, price, quantity});
            return response.status === 201;
        }catch(e) {
            throw e;
        }
    }

    public async delete(id: string): Promise<boolean> {
        try{
            const response = await api.delete(`/${id}`)
            return response.status == 204;
        }catch(e){
            throw e;
        }
    }
}

export default ThirdPartyService
