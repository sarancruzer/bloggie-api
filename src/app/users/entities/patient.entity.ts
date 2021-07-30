import { Assessment } from "src/app/assessment/entities/assessment.entity";
import { EntityBase } from "src/app/shared/entities/entity-base.entity";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, ManyToOne } from "typeorm";
import { User } from "./user.entity";

export enum GenderStatus {
    MALE = "MALE",
    FEMALE = "FEMALE",
    TRANSGENDER = "TRANSGENDER",
    NONE = "NONE"
}

@Entity({name: "patients"})
export class Patient extends EntityBase {

   
    @Column({ name: "patientName", length: 100 })
    patientName: string;

    @Column({ name: "dob", length: 50, nullable: true })
    dob: string;

    @Column({ name: "relation_type", nullable: true })
    relationType: string;

    @Column({ name: "gender", type: "enum", enum: GenderStatus, default: GenderStatus.NONE })
    gender: GenderStatus;

    @OneToOne(type => Assessment, assessment => assessment.patient)
    assessment: Assessment;

    @ManyToOne(type => User)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;
}
