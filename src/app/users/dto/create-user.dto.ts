import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, isEmail, IsNotEmpty, Matches } from "class-validator";
import { Match } from "src/app/shared/decorators/match.decorator";

export const lettersPattern = /^[a-zA-Z0-9]+ ?([a-zA-Z0-9]+$){1}/
export const mobilePattern = /^((\\+91-?)|0)?[0-9]{10}$/
export const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

export class CreateUserDto {

    @IsNotEmpty()
    @Matches(lettersPattern, {
        message: 'Only letters are allowed'
    })
    firstName: string;


    @IsNotEmpty()
    @Matches(lettersPattern, {
        message: 'Only letters are allowed'
    })
    lastName: string;


    @IsNotEmpty()
    @IsEmail()
    email: string;


    @IsNotEmpty()
    @Matches(mobilePattern, {
        message: 'Enter valid Mobile Number'
    })
    mobileNumber: string;


    @IsNotEmpty()
    @Matches(passwordPattern, {
        message: 'Must contain at least 8 characters ,one lowercase letter, one uppercase letter, one numeric digit, and one special character'
    })
    password: string;


    @IsNotEmpty()
    @Match('password', {
        message: 'Password and Confirm Password must be match'
    })
    confirmPassword: string;


    @IsNotEmpty()
    relationType: string;


    @IsNotEmpty()
    @Matches(lettersPattern, {
        message: 'Only letters are allowed'
    })
    patientName: string;


    @IsNotEmpty()
    dob: string;
}


// Response DTO
@Exclude()
export class UsersDto {


    @Expose()
    id: string;


    @Expose()
    firstName: string;


    @Expose()
    lastName: string;


    @Expose()
    email: string;


    @Expose()
    token: string;


    @Expose()
    role: string;
}