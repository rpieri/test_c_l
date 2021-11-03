import 'reflect-metadata'
import 'dotenv/config'
import '@shared/typeorm'
import '@shared/container';
import {container} from "tsyringe";
import IntegrateThirdPartyService from "@modules/event_products/services/IntegrateThirdPartyService";
import {Logger} from "tslog";

const log = new Logger()
log.info("Started worker....!!!")
setInterval(async () => {
    const service = container.resolve(IntegrateThirdPartyService)
    await service.execute();
}, 60000)
