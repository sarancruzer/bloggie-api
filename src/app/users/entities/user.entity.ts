import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import * as bcrypt from 'bcryptjs';
import { IUser } from "../interface/user.interface";
import { EntityBase } from "src/app/shared/entities/entity-base.entity";

export enum Role {
    SUPERADMIN = "SUPERADMIN",
    ADMIN = "ADMIN",
    USER = "USER"
}

@Entity({name: "users"})
export class User extends EntityBase implements IUser {

    @Column({ name: "first_name", length: 100})
    firstName: string;

    @Column({ name: "last_name", length: 50, nullable: true})
    lastName: string;

    @IsEmail()
    @Column({ name: "email", length: 100, unique: true })
    email: string;

    @Column({ type: "varchar", name: "mobile_number", length: 20, nullable: true })
    mobileNumber: string;    

    @Column({ type: "text", name: "password" })
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    @Column({ name: "role", type: "enum", enum: Role, default: Role.USER })
    role: Role;

    @Column({ type: "integer", name: "password_flag", default: 0 })
    passwordFlag: number;
   
    @Column({ type: "integer", name: "email_verify", default: 0 })
    emailVerify: number;    

    
}
