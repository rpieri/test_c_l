import ProductRepositoryFake from "@modules/products/domain/repositories/fake/ProductRepositoryFake";
import EventProductRepositoryFake from "@modules/event_products/domain/repositories/fake/EventProductRepositoryFake";
import CreateEventProductService from "@modules/event_products/services/CreateEventProductService";
import DeleteProductService from "@modules/products/services/DeleteProductService";
import {v4 as uuid4} from "uuid"
import AppError from "@shared/errors/AppError";
import {IProductsRepository} from "@modules/products/domain/repositories/IProductRepository";
import {IEventProductRepository} from "@modules/event_products/domain/repositories/IEventProductRepository";
import {ICreateEventProductService} from "@modules/event_products/services/ICreateEventProductService";

let productRepositoryFake: IProductsRepository;
let eventProductRepositoryFake: IEventProductRepository;
let createEventProductService: ICreateEventProductService;
let service: DeleteProductService;

describe('DeleteProductService', () => {
    beforeEach(() => {
        productRepositoryFake = new ProductRepositoryFake();
        eventProductRepositoryFake = new EventProductRepositoryFake();
        createEventProductService = new CreateEventProductService(eventProductRepositoryFake);
        service = new DeleteProductService(productRepositoryFake, createEventProductService);
    });

    it('should be able to remove a product', async () => {
        const product = await productRepositoryFake.create({name: 'Product1', price: 20.69, quantity:10});
        await service.execute({id: product.id})
        const findProduct = await productRepositoryFake.findById(product.id)

        expect(findProduct).toBeUndefined();
    });

    it('should not be able to remove a product that it is not exist', async () => {
        const id = uuid4();

        await expect(
            service.execute({id})
        ).rejects.toBeInstanceOf(AppError);

    })
});
