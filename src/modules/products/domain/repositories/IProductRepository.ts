import {IProduct} from '../models/IProduct';
import {IFindProducts} from '../models/IFindProducts';
import {ICreateProduct} from '../models/ICreateProduct';

export interface IProductsRepository {
    findByName(name: string): Promise<IProduct | undefined>;

    findById(id: string): Promise<IProduct | undefined>;

    findAll(): Promise<IProduct[]>;

    create(data: ICreateProduct): Promise<IProduct>;

    save(product: IProduct): Promise<IProduct>;

    remove(product: IProduct): Promise<void>;
}
