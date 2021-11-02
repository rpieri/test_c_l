import ProductsRepository from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import {IProductsRepository} from "@modules/products/domain/repositories/IProductRepository";
import {ICreateProduct} from "@modules/products/domain/models/ICreateProduct";
import {IProduct} from "@modules/products/domain/models/IProduct";
import {ICreateEventProductService} from "@modules/event_products/services/ICreateEventProductService";
import {OperationEnum} from "@modules/event_products/enums/OperationEnum";


@injectable()
class CreateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
        @inject('CreateEventProductService')
        private createEventProductService: ICreateEventProductService
    ) {}

    public async execute({
                             name,
                             price,
                             quantity,
                         }: ICreateProduct): Promise<IProduct> {
        const productExists = await this.productsRepository.findByName(name);

        if (productExists) {
            throw new AppError('There is already one product with this name');
        }

        const product = await this.productsRepository.create({
            name,
            price,
            quantity,
        });

        await this.createEventProductService.execute({product_id: product.id, operation: OperationEnum.INSERT, name, price, quantity});
        return product;
    }
}

export default CreateProductService;
