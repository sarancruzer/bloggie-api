import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { validate } from "class-validator";
import { ResponseDto } from "src/app/shared/dto/response.dto";
import { CreateUserDto } from "src/app/users/dto/create-user.dto";
import { Role, User } from "src/app/users/entities/user.entity";
import { UsersService } from "src/app/users/users.service";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { LoginUserDto, UserTokenDto } from "../dto/login-user.dto";
import { plainToClass } from "class-transformer";
import { MailService } from "src/app/shared/services/mail/mail.service";
import { JwtCustomService } from "src/app/shared/services/jwt-custom.service";


import { authenticator } from 'otplib';
import { IAuthService } from "../interface/auth.interface";
import { IUser } from "src/app/users/interface/user.interface";
import { UserForgotPasswordDto } from "../dto/auth-dto";
import { ConfigService } from "@nestjs/config";




@Injectable()
export class AuthService implements IAuthService {
    secret = '';
    expiresIn = '';
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
     
        private readonly usersService: UsersService,
        private readonly mailService: MailService,
        private readonly jwtCustomService: JwtCustomService,
        private readonly configService: ConfigService,
    ) {
        this.secret = this.configService.get('JWT_SECRET');
        this.expiresIn = this.configService.get('JWT_EXPIRESIN');
     }

    // To register public users and send welcome mail service
    async register(createUserDto: CreateUserDto): Promise<IUser> {

        const errors = await validate(createUserDto);  // Validate Fileds
        if (errors.length > 0) {
            throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
        }

        const { email } = createUserDto;
        const isExistUser = await this.userRepository.findOne({ email });
        if (isExistUser) {
            throw new HttpException("Your email already exists!", HttpStatus.BAD_REQUEST);
        } 
        let newUser = new User();
        newUser.passwordFlag = 1;
        newUser.role = Role.USER;        
        const newUserValue = Object.assign(newUser, createUserDto);
        
        const user = await this.userRepository.save(newUserValue); 

        const token =  await this.generateAccessToken(user);
        this.mailService.userVerificationEmail(user, token);

        return user;     
    }   


    async authenticate(loginUserDto: LoginUserDto): Promise<UserTokenDto> {
        const errors = await validate(loginUserDto);  // Validate Fileds
        if (errors.length > 0) {
            throw new HttpException( errors , HttpStatus.BAD_REQUEST);
        }
        const { email } = loginUserDto;
        const user = await this.userRepository.findOne({ email });
        console.log("🚀 ~ file: auth.service.ts ~ line 89 ~ AuthService ~ authenticate ~ user", user)
        const error =  loginUserDto.email + ' User not found' ;
        if (!user) throw new HttpException( error, HttpStatus.UNAUTHORIZED);

        if (bcrypt.compareSync(loginUserDto.password, user.password)) {
            const userData = plainToClass(UserTokenDto, user);
            return userData;
        }
        const _errors = { email: 'Password is wrong!.' };
        throw new HttpException({ message: 'Password is wrong!', _errors }, HttpStatus.UNAUTHORIZED);
    }  


    

    
    // To send the token for verify email address
    async generateAccessToken(data: any): Promise<any> {

        let token = await this.jwtCustomService.jwtSign(data, '1h');
        const tokenData = {
            token: token 
        };
        return tokenData;
    }


    // To check email verify and  token is valid or not
    async verifyAccessToken(otp: string): Promise<Boolean> {        
        var data = '';
        try {
            authenticator.options = { 
                digits: 4,
                epoch: Date.now(),
                step: 600,
               };
            
            return await authenticator.check(otp, this.secret);
        } catch (err) {
          throw new HttpException('inValidToken', HttpStatus.UNAUTHORIZED);
        }     
             
    }    


    async forgotPassword(userForgotPasswordDto: UserForgotPasswordDto): Promise<any> {
        const errors = await validate(userForgotPasswordDto);  // Validate Fileds
        if (errors.length > 0) {
            throw new HttpException(errors, HttpStatus.BAD_REQUEST);
        }    
        const { email } = userForgotPasswordDto;

        const user = await this.userRepository.findOne({ email: email });

        const error =  email + ' User not found' ;
        if (!user) throw new HttpException(error, HttpStatus.UNAUTHORIZED);
      
        const token =  await this.generateAccessToken(user);
        this.mailService.forgotPasswordEmail(user, token);
    }    


    async customResponse(data: object, message: string, status: string, roleModules?: any): Promise<ResponseDto> {
        const dto = new ResponseDto();
        dto.status = status;
        dto.message = message;
        dto.data = data;
        if(data) {
            dto.token = this.generateJWT(data);
        }

        return dto;
    }

    public generateJWT(data: any) {
        return this.jwtService.sign({data}, {
                expiresIn: this.expiresIn,
                secret: this.secret
            });
    };

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
        }
        return null;
    }

}
