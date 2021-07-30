import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToClass, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { Therapist } from '../therapist/entities/therapist.entity';
import { TherapistService } from '../therapist/therapist.service';
import { Role, User } from '../users/entities/user.entity';
import { IUser } from '../users/interface/user.interface';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { IAppointmentService } from './interface/appointments.interface';
const { google } = require('googleapis');

@Injectable()
export class AppointmentsService implements IAppointmentService {

  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly therapistService: TherapistService,
  ) {
    
  }

  async create(createAppointmentDto: CreateAppointmentDto, currentUser: User): Promise<any> {

    const therapistData = await this.therapistService.findOne('1b21798d-8e89-480f-8ce2-aecea623c996');
    
    if (!therapistData) throw new HttpException( 'Category not found', HttpStatus.NOT_FOUND);

    let therapist = new Therapist();
    therapist.id = therapistData.id;    

    let appointment = new Appointment();
    appointment.appointmentDate = createAppointmentDto.appointmentDate;
    appointment.meetUrl = createAppointmentDto.meetUrl;
    appointment.createdBy = currentUser;
    appointment.createdFor = currentUser;
    appointment.therapist = therapist;

    let options = {
      clientId : '788532553103-bh8h7n2srclivo9htr8lpjpvsf3bsmo9.apps.googleusercontent.com',
      clientSecret : 'FLAjjuVw91TzeSJa5AssJmYD',
      refreshToken : '1//049l3jUeykm0-CgYIARAAGAQSNwF-L9Irta_1_doiuV_xbFhZBvbAA5v2zyIIigzKbYOqNkiWTI0k4oOs2qsLg_xm18EGqYhYcNM',
      date : "2021-7-1",
      time : "10:59",
      summary : 'CALL WITH AUTICARE',
      location : 'CHENNAI',
      description : 'Meet with AUTICARE to talk about the new client project and how to integrate the calendar for booking'
  }

    // const dd = await this.meet(options);
    // console.log("🚀 ~ file: appointments.service.ts ~ line 55 ~ AppointmentsService ~ create ~ dd", dd)

    const errors = await validate(appointment);  // Validate Fileds
    if (errors.length > 0) throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    
    this.appointmentRepository.save(appointment);  
  }

  async findAll(currentUser: IUser): Promise<any> {
      
    if (currentUser.role === Role.ADMIN) {
      return await this.appointmentRepository.createQueryBuilder("appointments").getMany(); 
    } else if (currentUser.role === Role.THERAPIST) {
      return await this.appointmentRepository.createQueryBuilder("appointments")
      .where("appointments.created_by = :id", { id: currentUser.id })
      .getMany(); 
    } else if (currentUser.role === Role.USER) {
      return await this.appointmentRepository.createQueryBuilder("appointments")
      .where("appointments.created_by = :id", { id: currentUser.id })
      .where("appointments.created_for = :id", { id: currentUser.id })
      .getMany(); 
    }
  }

  async findOne(id: string): Promise<any> {    
    const appointment = await this.appointmentRepository.createQueryBuilder("appointments")
      .leftJoinAndSelect("appointments.therapist", "tharapist")
      .where('appointments.id = :id', {id: id})
      .getOne(); 

    if (!appointment) throw new HttpException( 'appointment not found', HttpStatus.NOT_FOUND);
    return appointment; 
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }

  async meet(options: any){

    const { OAuth2 } = google.auth
    const SCOPES = ['https://www.googleapis.com/auth/calendar'];

      //upper part for api access

        var date1 = options.date + "T" + (options.time).split(":")[0] + ":00" + ":30";
        var date2 = options.date + "T" + (options.time).split(":")[0] + ":45" + ":30";


        var x = new Date(options.date + "T" + (options.time).split(":")[0] + ":00" + ":30");
        var y = new Date(options.date + "T" + (options.time).split(":")[0] + ":45" + ":30");


        var end1 = options.date + "T" + (x.getUTCHours()) + ":" + (x.getUTCMinutes()) + ":00" + ".000Z";
        var end2 = options.date + "T" + (y.getUTCHours()) + ":" + (y.getUTCMinutes()) + ":00" + ".000Z";

        //setting details for teacher
        let oAuth2Client = new OAuth2(
            options.clientId,
            options.clientSecret
        )

        oAuth2Client.setCredentials({
            refresh_token: options.refreshToken,
        });


        // Create a new calender instance.
        let calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

        

        //checking whether teacher is budy or not
        // let result = await calendar.events.list({
        //     calendarId: 'primary',
        //     timeMin: end1,
        //     timeMax: end2,
        //     maxResults: 1,
        //     singleEvents: true,
        //     orderBy: 'startTime',
        // });

        

        // let events = result.data.items;
        // console.log("🚀 ~ file: auth.service.ts ~ line 186 ~ AuthService ~ meet ~ result", result)
        // if (events.length) {
        //     console.log("you are busy for this time slot !");
        //     // return null;
        // }

        //checking end



        // Create a new event start date instance for teacher in their calendar.
        const eventStartTime = new Date();
        eventStartTime.setDate((options.date).split("-")[2]);
        const eventEndTime = new Date();
        eventEndTime.setDate((options.date).split("-")[2]);
        eventEndTime.setMinutes(eventStartTime.getMinutes() + 45);



        // Create a dummy event for temp users in our calendar
        const event = {
            summary: options.summary,
            location: options.location,
            description: options.description,
            colorId: 1,
            conferenceData: {
                createRequest: {
                    requestId: 'sadfasdf',
                    conferenceSolutionKey: {
                        type: "hangoutsMeet"
                    }
                }
            },
            start: {
                dateTime: eventStartTime,
                timeZone: 'Asia/Kolkata',
            },
            end: {
                dateTime: eventEndTime,
                timeZone: 'Asia/Kolkata',
            },
        }

       
            let link = await calendar.events.insert({
                calendarId: 'primary', 
                conferenceDataVersion: 1, 
                requestBody: event 
            })
            return link.data.hangoutLink

}

}
