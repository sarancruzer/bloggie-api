import { Controller, Post, UsePipes, Body, UseFilters, Inject, HttpStatus, LoggerService } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../dto/login-user.dto';
import { ResponseDto } from 'src/app/shared/dto/response.dto';
import { HttpExceptionFilter } from 'src/app/shared/exception-filters/http-exception.filter';
import { CreateUserDto } from 'src/app/users/dto/create-user.dto';
import { AUTH_SERVICE, IAuthService } from '../interface/auth.interface';
import { CommonService } from 'src/app/shared/services/common.service';
import { UserForgotPasswordDto } from '../dto/auth-dto';
import { ValidationPipe } from 'src/app/shared/pipes/validation.pipe';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
   
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly iAuthService: IAuthService,
    private readonly commonService: CommonService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: LoggerService
    ) {}

    // User register
    @ApiBody({ type: CreateUserDto })
    @UseFilters(new HttpExceptionFilter())
    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<ResponseDto>{

      const res =  await this.iAuthService.register(createUserDto);
      return this.commonService.customResponse(res, "Register successfully", HttpStatus.OK.toString());
    }

    // User authentication    
    @UseFilters(new HttpExceptionFilter())
    @UsePipes(new ValidationPipe())
    @Post('login')
    async authenticate(@Body() loginUserDto: LoginUserDto): Promise<ResponseDto> {

        const res =  await this.iAuthService.authenticate(loginUserDto);
        return this.iAuthService.customResponse(res, "Login successfully", HttpStatus.OK.toString());
    }


    // User forgot password - check user verification
    @UseFilters(new HttpExceptionFilter())
    @UsePipes(new ValidationPipe())
    @Post('verify/otp')
    async verifyAccessToken(@Body() data: any): Promise<ResponseDto> {
      
      const res =  await this.iAuthService.verifyAccessToken(data.otp);
      return this.commonService.customResponse({res}, 'validToken', HttpStatus.OK.toString());   
    }

    // User forgot password - check user verification
    @UseFilters(new HttpExceptionFilter())
    @UsePipes(new ValidationPipe())
    @Post('password/forgot')
    async forgotPassword(@Body() userForgotPasswordDto: UserForgotPasswordDto): Promise<ResponseDto>{     
 
      this.iAuthService.forgotPassword(userForgotPasswordDto);
      return this.commonService.customResponse([], 'Please check your email for Otp', HttpStatus.OK.toString());   
    }

    

    

}
