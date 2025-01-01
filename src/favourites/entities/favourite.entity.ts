import { Product } from "src/products/product.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favourite {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, { 
        eager: true, 
        onDelete: 'CASCADE', 
    })
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Column()
    productId: number;

    @ManyToOne(() => User, {
        createForeignKeyConstraints: false,
    })
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
    user: User;

    @Column()
    userEmail: string;
}
