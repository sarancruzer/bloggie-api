import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { getConnection, Repository } from 'typeorm';
import { JwtCustomService } from '../shared/services/jwt-custom.service';
import { Follow } from '../users/entities/follow.entity';
import { User } from '../users/entities/user.entity';
import { IUser } from '../users/interface/user.interface';
import { UsersService } from '../users/users.service';
import { CreateBlogDto, ListBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogTags } from './entities/blog-tags.entity';
import { Blog } from './entities/blog.entity';
import { Tags } from './entities/tags.entity';
import { IBlog, IBlogService } from './interface/blog.interface';

@Injectable()
export class BlogsService implements IBlogService {

  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>, 
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>, 
    @InjectRepository(Tags)
    private readonly tagsRepository: Repository<Tags>, 
    private readonly jwtService: JwtCustomService,
) {}

// To register public users and send welcome mail service
async create(createBlogDto: CreateBlogDto, currentUser: any): Promise<IBlog> {
    const errors = await validate(createBlogDto);  // Validate Fileds
    if (errors.length > 0) {
        throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }
   
    const shortCode = await this.jwtService.generateShortCode();
    createBlogDto.shortCode = createBlogDto.title.split(' ').join('-') + '-' + shortCode;
    createBlogDto.tags = createBlogDto.tags.map(x => this.toTitleCase(x));

        
    let tag = await this.tagsRepository.findOne({ 
      where: { tagName: createBlogDto.tags[0] }
     });
    console.log("🚀 ~ file: blogs.service.ts ~ line 47 ~ BlogsService ~ create ~ tag", tag)
    if (!tag) {
      let newTags = new Tags();
      newTags.tagName = createBlogDto.tags[0];
      tag = await this.tagsRepository.save(newTags);
      console.log("🚀 ~ file: blogs.service.ts ~ line 52 ~ BlogsService ~ create ~ tag", tag)
    }
    console.log("🚀 ~ file: blogs.service.ts ~ line 54 ~ BlogsService ~ create ~ tag", tag)


    let newBlog = new Blog();
    newBlog.author = currentUser; 
    newBlog.tag = tag;
    const newUserValue = Object.assign(newBlog, createBlogDto);    
    console.log("🚀 ~ file: blogs.service.ts ~ line 59 ~ BlogsService ~ create ~ newUserValue", newUserValue)
    const blog = await this.blogRepository.save(newUserValue); 

    let blogTagsArr = [];
    const tags = await getConnection().createQueryBuilder(Tags, "tags")
    .where("tags.tag_name IN (:...tags)", { tags: createBlogDto.tags })
    .getMany();

    tags.map(e => blogTagsArr.push(e.id));

    const tagsData = [];
    createBlogDto.tags.forEach(element => {
        let newTags = new Tags();
        newTags.tagName = element;
        tagsData.push(newTags);
    })
    
    const savedTagsData = await getConnection().createQueryBuilder().insert().into(Tags).values(tagsData)
                        .onConflict(`("tag_name") DO NOTHING`).execute();
    savedTagsData.identifiers.map(e => (e) ? blogTagsArr.push(e.id): '');


    const blogTagsData = [];
    blogTagsArr.forEach(element => {
        let newBlogTags = new BlogTags();
        newBlogTags.blog = blog;
        newBlogTags.tags = element;
        blogTagsData.push(newBlogTags);
    })
    const savedBlogTagsDataa = await getConnection().createQueryBuilder().insert().into(BlogTags)
                        .values(blogTagsData)
                        .orIgnore()
                        .execute();
    
   
    // this.mailService.userVerificationEmail(user, token);

    return blog;
}   


async findAll(currentUser: IUser): Promise<any> {
    const blogs =  await this.blogRepository.createQueryBuilder("blogs")
              .leftJoinAndSelect('blogs.tag', 'tag')
              .leftJoinAndSelect('blogs.blogTags', 'blogTags')
              .leftJoinAndSelect('blogTags.tags', 'tags')
              .where("blogs.author = :id", { id: currentUser.id })
              .getMany(); 

    console.log("🚀 ~ file: blogs.service.ts ~ line 83 ~ BlogsService ~ findAll ~ blogs", blogs)

    const blogData = plainToClass(ListBlogDto, blogs);
    return blogData;
  } 

  async getBlogByTags(tagsData: string[]): Promise<any> {
    const blogs =  await this.blogRepository.createQueryBuilder("blogs")
              .leftJoinAndSelect('blogs.tag', 'tag')
              .leftJoinAndSelect('blogs.blogTags', 'blogTags')
              .leftJoinAndSelect('blogTags.tags', 'tags')
              .leftJoinAndSelect('blogs.author', 'author')

              // .where("tags.tagName like :name", { name:`%${firstName}%` })
              .getMany(); 

    const blogData = plainToClass(ListBlogDto, blogs);
    return blogData;
  } 

  async getBlogByFollowing(currentUser: User): Promise<ListBlogDto[]> {
    // const followingList = await this.followRepository.find({ user: currentUser });
    const followingList =  await this.followRepository.createQueryBuilder("follow")
              .leftJoinAndSelect('follow.following', 'following')
              .where("follow.user = :id", { id: currentUser.id })
              .getMany(); 
    console.log("🚀 ~ file: blogs.service.ts ~ line 110 ~ BlogsService ~ getBlogByFollowing ~ followingList", followingList)
    
    const following = followingList.map(x => x.following.id);
    console.log("🚀 ~ file: blogs.service.ts ~ line 113 ~ BlogsService ~ getBlogByFollowing ~ following", following)

    const blogs =  await this.blogRepository.createQueryBuilder("blogs")
              .leftJoinAndSelect('blogs.blogTags', 'blogTags')
              .leftJoinAndSelect('blogTags.tags', 'tags')
              .where("blogs.user_id IN (:...users)", { users: following })
              .getMany(); 

    const blogData = plainToClass(ListBlogDto, blogs);
    return blogData;
  } 


  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }



  
private toTitleCase(string = ''):string {
  const regex = /^[a-z]{0,1}|\s\w/gi;

  string = string.toLowerCase();

  string.match(regex).forEach((char) => {
    string = string.replace(char, char.toUpperCase());
  });

  return string;
}

private toPascalCase(string): string {
  return `${string}`
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w+)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\s/, 'g'), '')
    .replace(new RegExp(/\w/), s => s.toUpperCase());
}

}

