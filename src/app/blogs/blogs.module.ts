import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { BLOG_SERVICE } from './interface/blog.interface';
import { Blog } from './entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { Tags } from './entities/tags.entity';
import { BlogTags } from './entities/blog-tags.entity';
import { User } from '../users/entities/user.entity';
import { Follow } from '../users/entities/follow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog, Tags, BlogTags, Follow]),
    SharedModule
  ],
  controllers: [BlogsController],
  providers: [{
    useClass: BlogsService,
    provide: BLOG_SERVICE
  },]
})
export class BlogsModule {}
