import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USER_SERVICE } from './interface/user.interface';
import { CommonService } from '../shared/services/common.service';
import { Follow } from './entities/follow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Follow])
  ],
  controllers: [UsersController],
  providers: [
    {
      useClass: UsersService,
      provide: USER_SERVICE
    },
    CommonService,
  ]
})
export class UsersModule {}
