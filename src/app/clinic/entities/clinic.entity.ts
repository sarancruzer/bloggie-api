import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { IsEmail } from "class-validator";
import { User } from "src/app/users/entities/user.entity";
import { EntityBase } from "src/app/shared/entities/entity-base.entity";

export enum ClinicStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

@Entity({name: "clinic"})
export class Clinic extends EntityBase {

    @Column({ name: "first_name", length: 100})
    firstName: string;

    @Column({ name: "last_name", length: 50 })
    lastName: string;

    @IsEmail()
    @Column({ name: "email", length: 100, unique: true })
    email: string;

    @Column({ name: "clinic_name", length: 255 })
    clinicName: string;
   
    @Column({ name: "mobile", length: 50, unique: true })
    mobileNumber: string;   

    @Column({ name: "reason", nullable: true })
    reason: string;

    @OneToMany(type => User, user => user.clinic)
    user: User[];
}
