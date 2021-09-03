import { EntityBase } from "src/app/shared/entities/entity-base.entity";
import { User } from "src/app/users/entities/user.entity";
import { Entity, Column, JoinColumn, ManyToOne, ManyToMany, OneToMany } from "typeorm";
import { IBlog } from "../interface/blog.interface";
import { BlogTags } from "./blog-tags.entity";
import { Category } from "./category.entity";
import { Tags } from "./tags.entity";

export enum BlogStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    BLOCKED = "BLOCKED",
}


@Entity({name: "blogs"})
export class Blog extends EntityBase implements IBlog {
   
    @Column({ name: "title",  type: 'text'})
    title: string;

    @Column({ name: "caption",  type: 'text', nullable: true})
    caption: string;

    @Column({ name: "content", type: 'text' })
    content: string;

    @Column({ name: "short_code",  type: 'text', nullable: true })
    shortCode: string;

    @Column({ name: "blog_status", type: "enum", enum: BlogStatus, default: BlogStatus.DRAFT })
    blogStatus: BlogStatus;

    @ManyToOne(type => User)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    author: User;

    @ManyToOne(type => Tags)
    @JoinColumn({name: 'tags_id', referencedColumnName: 'id'})
    tag: Tags;

    @OneToMany(type => BlogTags, blogTags => blogTags.blog)
    blogTags: BlogTags[];
}
