import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateUserDto, FollowDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Follow } from './entities/follow.entity';
import { User } from './entities/user.entity';
import { IUser } from './interface/user.interface';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>
) { }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async userProfile(currentUser: User): Promise<IUser | undefined> {
    const user = await this.userRepository.createQueryBuilder("users")
                  .where("users.user_id = :id", { id: currentUser.id })
                  .getOne(); 
    if (!user) throw new HttpException( 'error', HttpStatus.NOT_FOUND);
    return user; 
  }

  async userFollow(followDto: FollowDto, currentUser: User): Promise<void> {

        const errors = await validate(followDto);  // Validate Fileds
        if (errors.length > 0) {
            throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
        }

        const user = await this.userRepository.findOne({ id: followDto.following });
        if (!user) {
            throw new HttpException("User not found!", HttpStatus.BAD_REQUEST);
        } 

        let newFollow = new Follow();
        newFollow.following = user;
        newFollow.user = currentUser;        
        this.followRepository.save(newFollow); 
  }
  
}
