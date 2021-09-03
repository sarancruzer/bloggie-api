import { EntityBase } from "src/app/shared/entities/entity-base.entity";
import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { Blog } from "./blog.entity";

export enum BlogStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    BLOCKED = "BLOCKED",
}


@Entity({name: "tags"})
export class Tags extends EntityBase {
   
    @Column({ name: "tag_name", length: 100, unique: true })
    tagName: string;
    
}
