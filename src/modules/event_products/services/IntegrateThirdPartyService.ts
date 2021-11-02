import {IIntegrateThirdPartyService} from "@modules/event_products/services/IIntegrateThirdPartyService";
import {IEventProductRepository} from "@modules/event_products/domain/repositories/IEventProductRepository";
import {inject, injectable} from "tsyringe";
import {ISendServiceFactory} from "@modules/event_products/factories/ISendServiceFactory";
import {Logger} from "tslog";

@injectable()
class IntegrateThirdPartyService implements IIntegrateThirdPartyService {
    private readonly log: Logger;
    constructor(
        @inject('EventProductRepository')
        private repository: IEventProductRepository,
        @inject('SendServiceFactory')
        private factory: ISendServiceFactory
    ) {
        this.log = new Logger();
    }

    public async execute(): Promise<void> {
        try {
            const events = await this.repository.findAllByExecuted();

            for (const event of events) {
                this.log.info(`Start integration of product: ${event.name}`);
                const sendService = this.factory.factory(event.operation);
                await sendService.send(event);
                this.log.info(`Finished integration of product: ${event.name}`);
            }
        }catch (e){
            this.log.fatal(e);
        }
    }
}

export default IntegrateThirdPartyService;
