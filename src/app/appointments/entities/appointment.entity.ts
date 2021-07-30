import { Clinic } from "src/app/clinic/entities/clinic.entity";
import { EntityBase } from "src/app/shared/entities/entity-base.entity";
import { Therapist } from "src/app/therapist/entities/therapist.entity";
import { User } from "src/app/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";

@Entity({name: "appointments"})
export class Appointment extends EntityBase {
   
    @Column({ name: "appointment_date" })
    appointmentDate: string;
    
    @Column({ name: "meet_url", nullable: true })
    meetUrl: string;

    @ManyToOne(type => User)
    @JoinColumn({name: 'created_by', referencedColumnName: 'id'})
    createdBy: User;

    @ManyToOne(type => User)
    @JoinColumn({name: 'created_for', referencedColumnName: 'id'})
    createdFor: User;

    @ManyToOne(type => Therapist)
    @JoinColumn({name: 'therapist_id', referencedColumnName: 'id'})
    therapist: Therapist;

}
