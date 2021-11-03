import "reflect-metadata"
import {IProductsRepository} from "@modules/products/domain/repositories/IProductRepository";
import ShowProductsService from "@modules/products/services/ShowProductsService";
import ProductRepositoryFake from "@modules/products/domain/repositories/fake/ProductRepositoryFake";
import Product from "@modules/products/infra/typeorm/entities/Product";

let productRepositoryFake: IProductsRepository;
let service: ShowProductsService;
describe('ShowProductService', () => {
    beforeEach(() => {
        productRepositoryFake = new ProductRepositoryFake();
        service = new ShowProductsService(productRepositoryFake);
    });

    it('should be able to return a product', async () => {
        const product = await productRepositoryFake.create({name: 'Product1', price: 20.69, quantity:10});
        const productFind = await service.execute({id: product.id});

        expect(productFind).toBeInstanceOf(Product);
        expect(productFind).toEqual(product)
    });
});
