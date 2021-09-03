import { EntityBase } from "src/app/shared/entities/entity-base.entity";
import { Entity, Column } from "typeorm";

@Entity({name: "category"})
export class Category extends EntityBase  {
   
    @Column({ name: "category_name",  type: 'character varying'})
    categoryName: string;

    @Column({ name: "short_code",  type: 'character varying', nullable: true})
    shortCode: string;

}
