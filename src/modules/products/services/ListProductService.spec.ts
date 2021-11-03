import ProductRepositoryFake from "@modules/products/domain/repositories/fake/ProductRepositoryFake";
import ListProductService from "@modules/products/services/ListProductService";
import {IProductsRepository} from "@modules/products/domain/repositories/IProductRepository";

let productRepositoryFake: IProductsRepository;
let listProductService: ListProductService;

describe('ListProductService', () => {
    beforeEach(() => {
       productRepositoryFake = new ProductRepositoryFake();
       listProductService = new ListProductService(productRepositoryFake);
    });

    it('should be able to return 3 products', async () =>{
        await productRepositoryFake.create({name: 'Product1', price: 20.69, quantity:10});
        await productRepositoryFake.create({name: 'Product2', price: 20.69, quantity:10});
        await productRepositoryFake.create({name: 'Product3', price: 20.69, quantity:10});

        const products = await listProductService.execute();

        expect(products).toHaveLength(3);
    });
});
