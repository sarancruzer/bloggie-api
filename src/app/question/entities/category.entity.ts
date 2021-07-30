import { EntityBase } from 'src/app/shared/entities/entity-base.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { Question } from './question.entity';

@Entity({name: "category"})
export class Category extends EntityBase {   

    @Column({ name: "category_name", length: 100 })
    categoryName: string;

    @Column({ name: "short_name", length: 10, nullable: true })
    shortName: string;

    @OneToMany(type => Question, question => question.category)
    question: Question[];    
  
}


