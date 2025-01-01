import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Product } from "./../../products/product.entity";

@Entity()
@Unique(["name"])
export class ComplementaryTechnique {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Product, (product) => product.complementaryTechniques)
    products: Product[]
    
}