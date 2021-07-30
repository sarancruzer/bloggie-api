import { CreateAppointmentDto } from "../dto/create-appointment.dto";

export const APPOINTMENT_SERVICE = 'APPOINTMENT SERVICE';

export interface IAppointmentService {

    create(createAppointmentDto: CreateAppointmentDto, user: object): Promise<any>;

    findAll(user: object): Promise<any>;

    findOne(id: string);

}