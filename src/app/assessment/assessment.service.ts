import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { ResponseDto } from '../shared/dto/response.dto';
import { CommonService } from '../shared/services/common.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { Assessment } from './entities/assessment.entity';

@Injectable()
export class AssessmentService {

  constructor(
    @InjectRepository(Assessment)
    private readonly assessmentRepository: Repository<Assessment>,
    private readonly commonService: CommonService
  ) { }

  async create(createAssessmentDto: CreateAssessmentDto): Promise<ResponseDto> {
    let assessment = new Assessment();
    const newAssessment = Object.assign(assessment, createAssessmentDto);
    const errors = await validate(createAssessmentDto);  // Validate Fileds
    if (errors.length > 0) {
      throw new HttpException({ message: "invalidInput", errors }, HttpStatus.BAD_REQUEST);
    } else {
      this.assessmentRepository.save(newAssessment);
      return this.commonService.customResponse([], "Question created", HttpStatus.CREATED.toString());
    }
  }

  async findAll(): Promise<ResponseDto> {
    const questionList = await this.assessmentRepository.find();
    const questionData = plainToClass(CreateAssessmentDto, questionList);

    return this.commonService.customResponse(questionData, "Successfully received", HttpStatus.OK.toString());
  }

  findOne(id: number) {
    return `This action returns a #${id} assessment`;
  }

  update(id: number, updateAssessmentDto: UpdateAssessmentDto) {
    return `This action updates a #${id} assessment`;
  }

  remove(id: number) {
    return `This action removes a #${id} assessment`;
  }

}
