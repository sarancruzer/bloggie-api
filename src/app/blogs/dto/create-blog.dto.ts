import { Exclude, Expose, Type } from "class-transformer";
import { ArrayMinSize, arrayMinSize, IsNotEmpty } from "class-validator";
import { UsersDto } from "src/app/users/dto/create-user.dto";

export class CreateBlogDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    caption: string;

    @IsNotEmpty()
    content: string;

    shortCode: string;

    @IsNotEmpty()
    @ArrayMinSize(2)
    tags: string[];


}

@Exclude()
export class ListBlogDto {

    @Expose()
    title: string;

    @Expose()
    caption: string;

    @Expose()
    content: string;
    
    @Expose()
    shortCode: string;

    @Expose()
    createdAt: Date;

    @Expose()
    @Type(() => UsersDto)
    author: UsersDto[];
    
    @Expose()
    @Type(() => BlogTagsDto)
    blogTags: BlogTagsDto[];

    @Expose()
    @Type(() => TagsDto)
    tag: TagsDto[];

}

@Exclude()
export class BlogTagsDto {

    @Expose()
    @Type(() => TagsDto)
    tags: TagsDto[];
}


@Exclude()
export class TagsDto {

    @Expose()
    tagName: string;

}
