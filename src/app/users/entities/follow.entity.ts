import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { EntityBase } from "src/app/shared/entities/entity-base.entity";
import { User } from "./user.entity";



@Entity({name: "follow"})
export class Follow extends EntityBase  {

    @ManyToOne(type => User)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;
    
    @ManyToOne(type => User)
    @JoinColumn({name: 'following_id', referencedColumnName: 'id'})
    following: User;
    
}
