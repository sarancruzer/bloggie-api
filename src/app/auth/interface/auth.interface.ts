import { ResponseDto } from "src/app/shared/dto/response.dto";
import { CreateUserDto } from "src/app/users/dto/create-user.dto";
import { IUser } from "src/app/users/interface/user.interface";
import { UserForgotPasswordDto } from "../dto/auth-dto";
import { LoginUserDto, UserTokenDto } from "../dto/login-user.dto";
export const AUTH_SERVICE = 'AUTH SERVICE';

export interface IAuthService {

    register(createUserDto: CreateUserDto): Promise<IUser>;

    authenticate(loginUserDto: LoginUserDto): Promise<UserTokenDto>;

    validateUser(username: string, pass: string): Promise<any>;

    verifyAccessToken(otp: string): Promise<Boolean>;

    customResponse(data: object, message: string, status: string, roleModules?: any): Promise<ResponseDto>;

    forgotPassword(data: UserForgotPasswordDto): Promise<any>;


}