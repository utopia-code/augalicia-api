import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Product } from "./../../products/product.entity";

@Entity()
@Unique(["name"])
export class TypeProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Product, (product) => product.typeProduct)
    products: Product[];
}