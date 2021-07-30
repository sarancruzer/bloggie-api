import { IUser } from "src/app/users/interface/user.interface";

export interface ITherapist {
    firstName: string,
    lastName?: string,
    email: string,
    mobileNumber: string,
    specialist: string,
    education?: string,
    experience?: string,
    about?: string;
    location: string;
    user?: IUser
   
}