import { Product } from "src/products/product.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

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