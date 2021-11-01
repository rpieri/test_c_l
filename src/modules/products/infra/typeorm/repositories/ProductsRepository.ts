import {EntityRepository, getRepository, Repository} from "typeorm";
import Product from "@modules/products/infra/typeorm/entities/Product";
import {IProductsRepository} from "@modules/products/domain/repositories/IProductRepository";
import {ICreateProduct} from "@modules/products/domain/models/ICreateProduct";

class ProductsRepository implements IProductsRepository {
    private ormRepository: Repository<Product>;

    constructor() {
        this.ormRepository = getRepository(Product);
    }

    public async create({
                            name,
                            price,
                            quantity,
                        }: ICreateProduct): Promise<Product> {
        const product = this.ormRepository.create({name, price, quantity});

        await this.ormRepository.save(product);

        return product;
    }

    public async save(product: Product): Promise<Product> {
        await this.ormRepository.save(product);

        return product;
    }

    public async remove(product: Product): Promise<void> {
        await this.ormRepository.remove(product);
    }

    public async findByName(name: string): Promise<Product | undefined> {
        const product = this.ormRepository.findOne({
            where: {
                name,
            },
        });

        return product;
    }

    public async findById(id: string): Promise<Product | undefined> {
        const product = this.ormRepository.findOne(id);

        return product;
    }

    public async findAll(): Promise<Product[]> {
        const products = this.ormRepository.find();

        return products;
    }


}

export default ProductsRepository