import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseFilters, UseGuards, UsePipes, Inject, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../shared/exception-filters/http-exception.filter';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { CommonService } from '../shared/services/common.service';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BLOG_SERVICE, IBlogService } from './interface/blog.interface';

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController   {
  constructor(
    @Inject(BLOG_SERVICE)
    private readonly blogsService: IBlogService,
    private readonly commonService: CommonService
    ) {}

    // To create a new blog with Auth
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe())
  @ApiBearerAuth('JWT-auth')
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto, @Req() req: any) {
    console.log("🚀 ~ file: blogs.controller.ts ~ line 25 ~ BlogsController ~ create ~ createBlogDto", createBlogDto)
    return await this.blogsService.create(createBlogDto, req.user.data);
  }

  // get blogs by status with Auth for blogs managment
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe())
  @ApiBearerAuth('JWT-auth')
  @Get()
  async findAll(@Req() req: any) {
    console.log("🚀 ~ file: blogs.controller.ts ~ line 35 ~ BlogsController ~ findAll ~ req", req)
    const res =  await this.blogsService.findAll(req.user.data);
    return await this.commonService.customResponse(res, 'blogs received', HttpStatus.OK.toString());
  }

  // get blogs by status with Auth for blogs managment
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe())
  @Post('tags')
  async getBlogByTags(@Body() tagsData: string[]) {
    console.log("🚀 ~ file: blogs.controller.ts ~ line 49 ~ BlogsController ~ getBlogByTags ~ tagsData", tagsData)
    const res =  await this.blogsService.getBlogByTags(tagsData);
    return await this.commonService.customResponse(res, 'blogs received', HttpStatus.OK.toString());
  }

   // get blogs by status with Auth for blogs managment
   @UseGuards(AuthGuard('jwt'))
   @UseFilters(new HttpExceptionFilter())
   @UsePipes(new ValidationPipe())
   @ApiBearerAuth('JWT-auth')
   @Get('following')
   async getBlogByFollowing(@Req() req: any) {
     const res =  await this.blogsService.getBlogByFollowing(req.user.data);
     return await this.commonService.customResponse(res, 'blogs received', HttpStatus.OK.toString());
   }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(+id);
  }
}
