import {IProductsRepository} from "@modules/products/domain/repositories/IProductRepository";
import {ICreateProduct} from "@modules/products/domain/models/ICreateProduct";
import Product from "@modules/products/infra/typeorm/entities/Product";
import {v4 as uuid4} from "uuid"

class ProductRepositoryFake implements IProductsRepository {
    private products: Product[] = [];
    public async create({name, price, quantity}: ICreateProduct): Promise<Product> {
        const product = new Product();
        product.id = uuid4();
        product.name = name;
        product.price = price;
        product.quantity = quantity;

        this.products.push(product);
        return product;
    }

    public async findAll(): Promise<Product[]> {
        return this.products;
    }

    public async findById(id: string): Promise<Product | undefined> {
        return this.products.find(x => x.id === id);
    }

    public async findByName(name: string): Promise<Product | undefined> {
        return this.products.find(x => x.name === name);
    }

    public async remove(product: Product): Promise<void> {
        this.products = this.products.filter(x => x.id !== product.id);
    }

    public async save(product: Product): Promise<Product> {
        const index = this.products.findIndex(x => x.id === product.id);
        this.products[index] = product;
        return product;
    }
}

export default ProductRepositoryFake
