import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {OperationEnum} from "@modules/event_products/enums/OperationEnum";

@Entity('event_product')
class EventProduct {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    product_id: string;

    @Column("int")
    operation: OperationEnum;

    @Column()
    executed: boolean;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    integrated_at?: Date;

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;
}

export default EventProduct;