import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { TherapistService } from './therapist.service';
import { CreateTherapistDto } from './dto/create-therapist.dto';
import { UpdateTherapistDto } from './dto/update-therapist.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '../shared/dto/response.dto';
import { HttpExceptionFilter } from '../shared/exception-filters/http-exception.filter';
@ApiTags('therapist')
@Controller('therapist')
export class TherapistController {
  constructor(private readonly therapistService: TherapistService) {}

  @Post('create')
  create(@Body() createTherapistDto: CreateTherapistDto) {
    return this.therapistService.create(createTherapistDto);
  }

  @Get('all')
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe())
  findAll():Promise<ResponseDto> {
    return this.therapistService.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.therapistService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateTherapistDto: UpdateTherapistDto) {
    return this.therapistService.update(+id, updateTherapistDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.therapistService.remove(+id);
  }
}
