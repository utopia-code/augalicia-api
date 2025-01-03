import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Position, Type } from "./../../common/enums/notification.enum";
import { Product } from "./../../products/product.entity";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: Type })
    type: Type;

    @Column({ type: 'enum', enum: Position })
    position: Position;

    @Column()
    desc: string;

    @ManyToOne(() => Product, (product) => product.notifications, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'productId'})
    product: Product

    @Column()
    productId: number;
}