import ProductRepositoryFake from "@modules/products/domain/repositories/fake/ProductRepositoryFake";
import EventProductRepositoryFake from "@modules/event_products/domain/repositories/fake/EventProductRepositoryFake";
import CreateProductService from "@modules/products/services/CreateProductService";
import CreateEventProductService from "@modules/event_products/services/CreateEventProductService";
import AppError from "@shared/errors/AppError";
import {IProductsRepository} from "@modules/products/domain/repositories/IProductRepository";
import {IEventProductRepository} from "@modules/event_products/domain/repositories/IEventProductRepository";
import {ICreateEventProductService} from "@modules/event_products/services/ICreateEventProductService";

let productRepositoryFake: IProductsRepository;
let eventProductRepositoryFake: IEventProductRepository;
let createEventProductService: ICreateEventProductService;
let service: CreateProductService;
describe('CreateProductService', () =>{
    beforeEach(() =>{
       productRepositoryFake = new ProductRepositoryFake();
       eventProductRepositoryFake = new EventProductRepositoryFake();
       createEventProductService = new CreateEventProductService(eventProductRepositoryFake);
       service = new CreateProductService(productRepositoryFake, createEventProductService);
    });

    it('should be able to create a new product', async () => {
       const product = await service.execute({
           name: 'Product1',
           price: 20.14,
           quantity: 10
       });
       expect(product).toHaveProperty('id');
    });

    it('should not be able to create two products with the same name', async () => {
        const product = await service.execute({
            name: 'Product1',
            price: 20.14,
            quantity: 10
        });


        await expect(
            service.execute({
                name: 'Product1',
                price: 20.14,
                quantity: 10
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
