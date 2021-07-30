import { Exclude, Expose, Type } from "class-transformer";

export class CreateTherapistDto { 

    firstName: string;

    lastName: string;

    specialist: string;

    education: string;

    experience: string;

    about: string;

    location: string;
}

@Exclude()
export class TherapistListDto {
    
    @Expose()
    id: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    specialist: string;

    @Expose()
    education: string;

    @Expose()
    experience: string;

    @Expose()
    about: string;

    @Expose()
    location: string;

}