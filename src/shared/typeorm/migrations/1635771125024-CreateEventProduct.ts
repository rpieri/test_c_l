import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEventProduct1635771125024 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'event_product',
            columns: [
                {
                    name:'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name:'product_id',
                    type: 'uuid'
                },
                {
                    name:'name',
                    type: 'varchar'
                },
                {
                    name:'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2
                },
                {
                    name:'quantity',
                    type: 'int'
                },
                {
                    name:'operation',
                    type: 'int'
                },
                {
                    name:'executed',
                    type: 'boolean'
                },
                {
                    name:'created_at',
                    type: 'timestamp with time zone',
                    default: 'now()'
                },
                {
                    name:'integrated_at',
                    type: 'timestamp with time zone',
                    isNullable: true
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
