import "reflect-metadata"
import {IProductsRepository} from "@modules/products/domain/repositories/IProductRepository";
import UpdateProductService from "@modules/products/services/UpdateProductService";
import ProductRepositoryFake from "@modules/products/domain/repositories/fake/ProductRepositoryFake";
import {v4 as uuid4} from "uuid"
import AppError from "@shared/errors/AppError";
import Product from "@modules/products/infra/typeorm/entities/Product";

let productRepositoryFake: IProductsRepository;
let service: UpdateProductService;

describe('UpdateProductService', () => {
    beforeEach(() => {
        productRepositoryFake = new ProductRepositoryFake();
        service = new UpdateProductService(productRepositoryFake);
    });

    it('should be not able to update a product if the product did not found', async () => {
        await expect(service.execute({
            id: uuid4(),
            name: 'Product 1',
            price: 22.69,
            quantity: 10
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should be not able to update a product if the name of product already exists in other product', async () => {
        const product = await productRepositoryFake.create({name: 'Product1', price: 20.69, quantity:10});
        const product2 = await productRepositoryFake.create({name: 'Product2', price: 20.69, quantity:10});

        await expect(service.execute({
            id: product.id,
            name: 'Product2',
            price: product.price,
            quantity: 122
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update a product', async () => {
        const product = await productRepositoryFake.create({name: 'Product1', price: 20.69, quantity:10});
        const newName = 'Product 2';
        const productUpdate = await service.execute({
            id: product.id,
            name: newName,
            price: product.price,
            quantity: 122
        });

        expect(productUpdate).toBeInstanceOf(Product);
        expect(productUpdate.name).toEqual(newName)
    });
});
