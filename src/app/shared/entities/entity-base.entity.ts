import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IEntityBase } from "../interface/entity-base.interface";

export abstract class EntityBase implements IEntityBase {

    @PrimaryGeneratedColumn("uuid", {name: "id"}) 
    id: string;

    @CreateDateColumn({type: "timestamp", name: "created_at"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp", name: "updated_at"})
    updatedAt: Date;

    // 0 = INACTIVE , 1 = ACTIVE 
    @Column({ type: "integer", name: "status", default: 1 })
    status: number;  
    
  }