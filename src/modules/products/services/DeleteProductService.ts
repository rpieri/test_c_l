import {getCustomRepository} from "typeorm";
import ProductsRepository from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import {inject, injectable} from "tsyringe";
import {IProductsRepository} from "@modules/products/domain/repositories/IProductRepository";
import {IDeleteProduct} from "@modules/products/domain/models/IDeleteProduct";

@injectable()
class DeleteProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({ id }: IDeleteProduct): Promise<void> {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new AppError('Product not found.');
        }

        await this.productsRepository.remove(product);
    }
}

export default DeleteProductService;
