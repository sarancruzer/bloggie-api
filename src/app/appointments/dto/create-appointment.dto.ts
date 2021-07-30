import { IsNotEmpty } from "class-validator";

export class CreateAppointmentDto {

    @IsNotEmpty()
    appointmentDate: string;

    meetUrl: string;

}
