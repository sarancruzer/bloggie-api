import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { ResponseDto } from '../shared/dto/response.dto';
import { CommonService } from '../shared/services/common.service';
import { CreateTherapistDto, TherapistListDto } from './dto/create-therapist.dto';
import { UpdateTherapistDto } from './dto/update-therapist.dto';
import { Therapist } from './entities/therapist.entity';

@Injectable()
export class TherapistService {
  constructor(
    @InjectRepository(Therapist)
    private readonly therapistRepository: Repository<Therapist>,
    private readonly commonService: CommonService
  ) {
    
  }
  create(createTherapistDto: CreateTherapistDto) {
    return 'This action adds a new therapist';
  }

  async findAll(): Promise<ResponseDto> {
    
    const therapistList  = await this.therapistRepository.find();    
    const therapistData = plainToClass(TherapistListDto, therapistList);
    
    return this.commonService.customResponse(therapistData, "Successfully received", HttpStatus.OK.toString());

  }

  async findOne(id: string): Promise<TherapistListDto> {
    const therapist  = await this.therapistRepository.findOne(id);    
    const therapistData = plainToClass(TherapistListDto, therapist);
    return therapistData;    
  }

  update(id: number, updateTherapistDto: UpdateTherapistDto) {
    return `This action updates a #${id} therapist`;
  }

  remove(id: number) {
    return `This action removes a #${id} therapist`;
  }
}
