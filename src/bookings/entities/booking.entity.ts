import { Appointment } from "src/appointments/entities/appointment.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./../../users/user.entity";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    people: number;

    @ManyToOne(() => Appointment, (appointment) => appointment.bookings,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'appointmentId'})
    appointment: Appointment;

    @Column()
    appointmentId: number

    @ManyToOne(() => User, {
        createForeignKeyConstraints: false,
    })
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
    user: User;

    @Column()
    userEmail: string;
}