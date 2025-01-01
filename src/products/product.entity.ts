

import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Image } from 'src/features/entities/image.entity';
import { Notification } from 'src/features/entities/notification.entity';
import { OpeningSeason } from 'src/features/entities/opening-season.entity';
import { Accesibility } from 'src/filters/entities/accesibility.entity';
import { ComplementaryTechnique } from 'src/filters/entities/complementary-technique.entity';
import { Service } from 'src/filters/entities/services.entity';
import { TermalTechnique } from 'src/filters/entities/termal-technique.entity';
import { Treatment } from 'src/filters/entities/treatment.entity';
import { TypeProduct } from 'src/filters/entities/type-product.entity';
import { TypeTermalCentre } from 'src/filters/entities/type-termal-centre.entity';
import { TypeWater } from 'src/filters/entities/type-water.entity';
import { User } from 'src/users/user.entity';
import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    tel: string;

    @Column()
    email: string;

    @Column()
    web: string;

    @Column()
    address: string;

    @Column()
    cp: string;

    @Column()
    location: string;

    @Column()
    desc: string;

    @Column()
    coordinates: string;

    @ManyToOne(() => TypeProduct, (typeProduct) => typeProduct.products, {
        cascade: true,
    })
    typeProduct: TypeProduct;

    @ManyToOne(() => TypeTermalCentre, (typeTermalCentre) => typeTermalCentre.products, {
        cascade: true,
        nullable: true 
    }) 
    typeTermalCentre: TypeTermalCentre;

    @ManyToMany(() => TermalTechnique, (termalTechnique) => termalTechnique.products, {
        cascade: true,
    })
    @JoinTable()
    termalTechniques: TermalTechnique[];

    @ManyToMany(() => TypeWater, (typeWater) => typeWater.products, {
        cascade: true,
    })
    @JoinTable()
    typeWaters: TypeWater[]

    @ManyToMany(() => Treatment, (treatment) => treatment.products, {
        cascade: true,
    })
    @JoinTable()
    treatments: Treatment[]

    @ManyToMany(() => Service, (service) => service.products, {
        cascade: true,
    })
    @JoinTable()
    services: Service[]

    @ManyToMany(() => Accesibility, (accesibility) => accesibility.products, {
        cascade: true,
    })
    @JoinTable()
    accesibility: Accesibility[]

    @ManyToMany(() => ComplementaryTechnique, (complementaryTechnique) => complementaryTechnique.products, {
        cascade: true,
    })
    @JoinTable()
    complementaryTechniques: ComplementaryTechnique[];

    @ManyToMany(() => OpeningSeason, (openingSeason) => openingSeason.products, {
        cascade: true,
    })
    @JoinTable()
    openingSeason: OpeningSeason[];

    @Column({ nullable: true })
    ageRequirement: number;

    @Column({ nullable: true })
    temperature: number;

    @OneToMany(() => Image, (image) => image.product, {
        cascade: true,
    })
    images: Image[];

    @OneToMany(() => Notification, (notification) => notification.product, {
        cascade: true,
    })
    notifications: Notification[];

    @OneToMany(() => Appointment, (appointment) => appointment.product, {
        cascade: true,
    })
    appointments: Appointment[];

    @ManyToOne(() => User, {
        createForeignKeyConstraints: false,
    })
    @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
    user: User;

    @Column()
    userEmail: string;

    @AfterInsert()
    logInsert() {
        console.log('Inserted Product with id', this.id)
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated Product with id', this.id)
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed Product with id', this.id)
    }
}