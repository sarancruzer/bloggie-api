

import { Question } from "src/app/question/entities/question.entity";
import { EntityBase } from "src/app/shared/entities/entity-base.entity";
import { Patient } from "src/app/users/entities/patient.entity";
import { Column, Entity,  OneToOne, JoinColumn } from "typeorm";

@Entity({name: "assessment"})
export class Assessment extends EntityBase {
  
    @OneToOne(type => Patient, patient => patient.assessment)
    @JoinColumn({name: 'patient_id', referencedColumnName: 'id'})
    patient: Patient;  

    @Column({ name: "score", length: 10})
    score: string; 

    @OneToOne(type => Question)
    @JoinColumn({name: 'question_id', referencedColumnName: 'id'})
    question: Question;  

    @Column({ name: "answer", length: 10})
    answer: string;

   
    
}
