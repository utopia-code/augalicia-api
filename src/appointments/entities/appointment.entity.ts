import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./../../bookings/entities/booking.entity";
import { Product } from "./../../products/product.entity";
import { User } from "./../../users/user.entity";

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    date: string;

    @Column({ type: 'varchar', length: 5 })
    hour: string;

    @Column({ type: 'decimal', scale: 2 })
    price: number;

    @Column({ type: 'int' })
    max_capacity: number;

    @Column({ default: 0 })
    booked_count: number;

    @Column({ default: false })
    is_booked: boolean;

    @ManyToOne(() => Product, (product) => product.appointments, { 
        onDelete: 'CASCADE', 
    })
    @JoinColumn({ name: 'productId'})
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

    @OneToMany(() => Booking, (booking) => booking.appointment, {
        cascade: true,
        eager: true
    })
    bookings: Booking[];
}
