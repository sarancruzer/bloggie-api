import { IsEmail, isEmail, IsNotEmpty } from "class-validator";


export class UserRegisterDto {
    
    @IsNotEmpty()
    firstName: string;

    lastName: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    mobileNumber: string;
}

export class CompanyRegisterDto {

    
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    companyName: string;

    mobileNumber: string;
}

export class TokenVerifyDto {

    @IsNotEmpty()
    token: string;

    email: string; 
}

// Request DTO
export class UserForgotPasswordDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;
}
