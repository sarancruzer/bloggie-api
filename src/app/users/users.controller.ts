import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Inject, HttpStatus, UseFilters, UsePipes, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, FollowDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IUserService, USER_SERVICE } from './interface/user.interface';
import { CommonService } from '../shared/services/common.service';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { HttpExceptionFilter } from '../shared/exception-filters/http-exception.filter';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly usersService: IUserService,
    private readonly commonService: CommonService
    ) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe())
  async userProfile(@Req() req: any) {
    const res = await this.usersService.userProfile(req.user.data);
    return await this.commonService.customResponse(res, 'appointment', HttpStatus.OK.toString());

  }

  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe())
  @ApiBearerAuth('JWT-auth')
  @Post('follow')
  userFollow(@Body() followDto: FollowDto, @Req() req: any) {
    this.usersService.userFollow(followDto, req.user.data);
    return this.commonService.customResponse([], 'appointment', HttpStatus.OK.toString());
  }



}
