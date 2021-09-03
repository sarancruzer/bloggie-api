import { EntityBase } from "src/app/shared/entities/entity-base.entity";
import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { Blog } from "./blog.entity";
import { Tags } from "./tags.entity";

export enum BlogStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    BLOCKED = "BLOCKED",
}


@Entity({name: "blog_tags"})
export class BlogTags extends EntityBase {
   
    @ManyToOne(type => Blog, blog => blog.blogTags)
    @JoinColumn({name: 'blog_id', referencedColumnName: 'id'})
    blog: Blog;

    @ManyToOne(type => Tags)
    @JoinColumn({name: 'tags_id', referencedColumnName: 'id'})
    tags: Tags;
    
}
