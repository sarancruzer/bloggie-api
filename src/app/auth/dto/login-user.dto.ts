import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/app/users/entities/user.entity';


export class LoginUserDto {

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

@Exclude()
export class UserTokenDto {

    @Expose()
    id: number;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    email: string;

    @Expose()
    mobileNumber: string;

    @Expose()
    token: string;

    @Expose()
    passwordFlag: number;

    @Expose()
    emailVerify: number;

    @Expose()
    role: Role;

}

