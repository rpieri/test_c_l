import {getCustomRepository} from "typeorm";
import ProductsRepository from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import {IProductsRepository} from "@modules/products/domain/repositories/IProductRepository";
import {IDeleteProduct} from "@modules/products/domain/models/IDeleteProduct";
import {ICreateEventProductService} from "@modules/event_products/services/ICreateEventProductService";
import {OperationEnum} from "@modules/event_products/enums/OperationEnum";

@injectable()
class DeleteProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
        @inject('CreateEventProductService')
        private createEventProductService: ICreateEventProductService
    ) {}

    public async execute({ id }: IDeleteProduct): Promise<void> {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new AppError('Product not found.');
        }

        await this.productsRepository.remove(product);

        await this.createEventProductService.execute({product_id: id, operation: OperationEnum.DELETE, name: " ", price: 0.0, quantity: 0});
    }
}

export default DeleteProductService;
