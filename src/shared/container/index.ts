import {container} from "tsyringe";
import {IProductsRepository} from "@modules/products/domain/repositories/IProductRepository";
import ProductsRepository from "@modules/products/infra/typeorm/repositories/ProductsRepository";

container.registerSingleton<IProductsRepository>(
    'ProductsRepository',
    ProductsRepository,
);