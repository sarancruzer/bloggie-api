import { Module } from '@nestjs/common';
import { TherapistService } from './therapist.service';
import { TherapistController } from './therapist.controller';
import { Therapist } from './entities/therapist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from '../shared/services/common.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Therapist])
  ],
  controllers: [TherapistController],
  providers: [TherapistService, CommonService],
  exports: [TherapistService]
})
export class TherapistModule {}
