import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';


@ApiTags('clinic')
@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post('create')
  create(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicService.create(createClinicDto);
  }

  @Get('all')
  findAll() {
    return this.clinicService.findAll();
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.clinicService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateClinicDto: UpdateClinicDto) {
    return this.clinicService.update(+id, updateClinicDto);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.clinicService.remove(+id);
  }
}
