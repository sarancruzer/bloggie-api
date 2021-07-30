import { Module } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { Assessment } from './entities/assessment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from '../shared/services/common.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assessment])
  ],
  controllers: [AssessmentController],
  providers: [AssessmentService, CommonService]
})
export class AssessmentModule {}
