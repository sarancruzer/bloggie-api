import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/app/users/entities/user.entity';
import { TherapistSeederService } from './therapist-seeder.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [TherapistSeederService],
    exports: [TherapistSeederService],
  })
export class TherapistSeederModule {}
