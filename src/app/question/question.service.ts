import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { getRepository, Repository } from 'typeorm';
import { ResponseDto } from '../shared/dto/response.dto';
import { CommonService } from '../shared/services/common.service';
import { CategoryDto, CreateQuestionDto, QuestionListDto } from './dto/create-question.dto';
import { Category } from './entities/category.entity';
import { Question } from './entities/question.entity';
import { IQuestionService } from './interface/question.interface';

@Injectable()
export class QuestionService implements IQuestionService {

  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly commonService: CommonService
  ) { }



  async create(createQuestionDto: CreateQuestionDto): Promise<any> {

    const category = await this.categoryRepository.findOne({ id: createQuestionDto.category });

    if (!category) throw new HttpException( 'Category not found', HttpStatus.NOT_FOUND);

    let question = new Question();
    question.category = category;

    const newQuestion = Object.assign(question, createQuestionDto);
    const errors = await validate(createQuestionDto);  // Validate Fileds
    if (errors.length > 0) throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    
    this.questionRepository.save(newQuestion);          
  }


  async findAll(): Promise<CategoryDto[]> {
    const questionList = await this.categoryRepository.createQueryBuilder("category")
                              .leftJoinAndSelect("category.question", "question")                             
                              .orderBy('category.created_at', 'DESC')
                              .getMany();
    const questionData = plainToClass(CategoryDto, questionList);  
    console.log("🚀 ~ file: question.service.ts ~ line 49 ~ QuestionService ~ findAll ~ questionData", questionData)
    return questionData;
  }

  findOne(id: string) {
    return `This action returns a #${id} question`;
  }

  
}
