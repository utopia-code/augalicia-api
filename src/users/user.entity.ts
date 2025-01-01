import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Role } from './../common/enums/role.enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: string;

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id', this.id)
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated User with id', this.id)
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed User with id', this.id)
    }
}