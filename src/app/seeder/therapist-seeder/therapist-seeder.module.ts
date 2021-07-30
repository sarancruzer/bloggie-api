import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Therapist } from 'src/app/therapist/entities/therapist.entity';
import { User } from 'src/app/users/entities/user.entity';
import { TherapistSeederService } from './therapist-seeder.service';

@Module({
    imports: [TypeOrmModule.forFeature([Therapist, User])],
    providers: [TherapistSeederService],
    exports: [TherapistSeederService],
  })
export class TherapistSeederModule {}
