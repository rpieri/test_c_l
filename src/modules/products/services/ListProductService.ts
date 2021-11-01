import {inject, injectable} from "tsyringe";
import {IProductsRepository} from "@modules/products/domain/repositories/IProductRepository";
import {IProduct} from "@modules/products/domain/models/IProduct";

@injectable()
class ListProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute(): Promise<IProduct[]> {
        return await this.productsRepository.findAll();
    }
}

export default ListProductService;