import { Controller, Get, Post, Body, Param, Request, UseFilters, UsePipes, Inject, UseGuards, HttpStatus, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResponseDto } from '../shared/dto/response.dto';
import { HttpExceptionFilter } from '../shared/exception-filters/http-exception.filter';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { CommonService } from '../shared/services/common.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { APPOINTMENT_SERVICE, IAppointmentService } from './interface/appointments.interface';

@Controller('appointments')
export class AppointmentsController {
  constructor(
    @Inject(APPOINTMENT_SERVICE)
    private readonly appointmentsService: IAppointmentService,
    private commonService: CommonService
    ) {}

  @Post('book')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe())
  @ApiBearerAuth('JWT-auth')
  async create(@Body() createAppointmentDto: CreateAppointmentDto, @Req() req: any):Promise<ResponseDto>  {
    const res = this.appointmentsService.create(createAppointmentDto, req.user.data);
   
    return await this.commonService.customResponse(res, 'appointment created', HttpStatus.OK.toString());
  }

  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe())
  async findAll(@Request() req: any):Promise<ResponseDto> {
    console.log("🚀 ~ file: appointments.controller.ts ~ line 27 ~ AppointmentsController ~ findAll ~ req", req)
    const res = await this.appointmentsService.findAll(req.user.data);
    return await this.commonService.customResponse(res, 'appointment list', HttpStatus.OK.toString());
  }

  @Get('one/:id')
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe())
  async findOne(@Param('id') id: string) {
    const res = await this.appointmentsService.findOne(id);
    return await this.commonService.customResponse(res, 'appointment', HttpStatus.OK.toString());
  }

  
}
