import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/app/shared/dto/response.dto';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';


@ApiTags('assessment')
@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post('create')
  @ApiBody({ type: CreateAssessmentDto})
  createAssessment(@Body() createAssessmentDto: CreateAssessmentDto) {
    return this.assessmentService.create(createAssessmentDto);
  }

  @Get('all')
  findAll(): Promise<ResponseDto> {
    return this.assessmentService.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.assessmentService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateAssessmentDto: UpdateAssessmentDto) {
    return this.assessmentService.update(+id, updateAssessmentDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.assessmentService.remove(+id);
  }


}
