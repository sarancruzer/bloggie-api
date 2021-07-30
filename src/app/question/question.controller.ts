import { Controller, Get, Post, Body, Param, Inject, HttpStatus } from '@nestjs/common';
import { CreateQuestionDto, QuestionListDto } from './dto/create-question.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '../shared/dto/response.dto';
import { IQuestionService, QUESTION_SERVICE } from './interface/question.interface';
import { CommonService } from '../shared/services/common.service';

@ApiTags('question')
@Controller('question')
export class QuestionController {
  constructor(
    @Inject(QUESTION_SERVICE)
    private readonly questionService: IQuestionService,
    private commonService: CommonService
    ) {}


  @Post('create')
  @ApiBody({ type: CreateQuestionDto})
  async create(@Body() createQuestionDto: CreateQuestionDto): Promise<ResponseDto> {
    const res =  this.questionService.create(createQuestionDto);
    return await this.commonService.customResponse(res, 'question created', HttpStatus.OK.toString());
  }

  @Get('all')
  @ApiOkResponse({ status: 200, type: QuestionListDto })
  async findAll():Promise<ResponseDto> {
    const res =  await this.questionService.findAll();
    return await this.commonService.customResponse(res, "Successfully received", HttpStatus.OK.toString());
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  
}
