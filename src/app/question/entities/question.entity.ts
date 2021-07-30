import { EntityBase } from 'src/app/shared/entities/entity-base.entity';
import { Entity,  Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../../question/entities/category.entity';

@Entity({name: "questions"})
export class Question extends EntityBase {
  
    @Column({ name: "question", type: 'text' })
    question: string;
    
    @Column({ name: "description", type: 'text', nullable: true })
    description: string;    

    @ManyToOne(type => Category, category => category.question)
    @JoinColumn({name: 'category_id', referencedColumnName: 'id'})
    category: Category;  
    
  
}


