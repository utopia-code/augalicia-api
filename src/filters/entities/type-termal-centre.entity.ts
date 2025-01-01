import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Product } from "./../../products/product.entity";

@Entity()
@Unique(["name"])
export class TypeTermalCentre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Product, (product) => product.typeTermalCentre)
    products: Product[];
}