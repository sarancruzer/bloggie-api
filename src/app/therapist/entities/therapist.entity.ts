
import { Clinic } from "src/app/clinic/entities/clinic.entity";
import { EntityBase } from "src/app/shared/entities/entity-base.entity";
import { User } from "src/app/users/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, ManyToOne } from "typeorm";
import { ITherapist } from "../interface/therapist.interface";

@Entity({name: "therapist"})
export class Therapist extends EntityBase implements ITherapist {
  
    @Column({ name: "firstName", length: 100 })
    firstName: string;

    @Column({ name: "lastName", length: 50, nullable: true })
    lastName: string;

    @Column({ name: "email", nullable: true })
    email: string;

    @Column({ type: "varchar", name: "mobile_number", length: 20, nullable: true })
    mobileNumber: string;    
    
    @Column({ name: "specialist", nullable: true })
    specialist: string;

    @Column({ name: "education", nullable: true  })
    education: string;

    @Column({ name: "experience", nullable: true })
    experience: string;

    @Column({ name: "about", nullable: true })
    about: string;

    @Column({ name: "location", nullable: true  })
    location: string;

    @OneToOne(type => User, user => user.therapist)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;

    @ManyToOne(type => Clinic)
    @JoinColumn({name: 'clinic_id', referencedColumnName: 'id'})
    clinic: Clinic;
}
