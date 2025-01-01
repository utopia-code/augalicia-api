import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Product } from "./../../products/product.entity";

@Entity()
@Unique(["name"])
export class Accesibility {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Product, (product) => product.accesibility)
    products: Product[]
    
}