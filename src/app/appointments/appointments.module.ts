import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { APPOINTMENT_SERVICE } from './interface/appointments.interface';
import { SharedModule } from '../shared/shared.module';
import { TherapistService } from '../therapist/therapist.service';
import { TherapistModule } from '../therapist/therapist.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    SharedModule,
    TherapistModule
  ],
  controllers: [AppointmentsController],
  providers: [
    {
      useClass: AppointmentsService,
      provide: APPOINTMENT_SERVICE
    },
    
    ]
})
export class AppointmentsModule {}
