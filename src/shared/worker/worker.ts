import 'reflect-metadata'
import AppError from "@shared/errors/AppError";
import '@shared/typeorm'
import '@shared/container';
import {container} from "tsyringe";
import ListProductService from "@modules/products/services/ListProductService";
import ThirdPartyService from "@modules/event_products/providers/ThirdPartyService";
import IntegrateThirdPartyService from "@modules/event_products/services/IntegrateThirdPartyService";
import {Logger} from "tslog";

const log = new Logger()
log.info("Started worker....!!!")
setInterval(async () => {
    const service = container.resolve(IntegrateThirdPartyService)
    await service.execute();
}, 60000)
