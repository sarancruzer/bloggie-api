import { User } from "src/app/users/entities/user.entity";
import { IUser } from "src/app/users/interface/user.interface";
import { CreateBlogDto, ListBlogDto } from "../dto/create-blog.dto";
import { UpdateBlogDto } from "../dto/update-blog.dto";

export const BLOG_SERVICE = 'BLOG SERVICE';

export interface IBlog {
    id?: string,
    title: string,
    caption: string,
    content: string,
    author: User,
    createdAt: Date,
    updatedAt: Date,
}

export interface IBlogService {

  create(createBlogDto: CreateBlogDto, data: any);

  findAll(currentUser: IUser);

  getBlogByTags(tagsData: string[]): Promise<any>;

  getBlogByFollowing(currentUser: User): Promise<ListBlogDto[]>;

  findOne(arg0: number);

  update(arg0: number, updateBlogDto: UpdateBlogDto);

  remove(arg0: number);

}

