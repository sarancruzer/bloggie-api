import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { Question } from './entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonService } from '../shared/services/common.service';
import { Category } from './entities/category.entity';
import { QUESTION_SERVICE } from './interface/question.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Category])
  ],
  controllers: [QuestionController],
  providers: [
    {
      useClass: QuestionService,
      provide: QUESTION_SERVICE
    },
    CommonService]
})
export class QuestionModule {}
