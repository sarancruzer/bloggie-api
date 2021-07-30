import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Therapist } from 'src/app/therapist/entities/therapist.entity';
import { ITherapist } from 'src/app/therapist/interface/therapist.interface';
import { Role, User } from 'src/app/users/entities/user.entity';
import { Repository } from 'typeorm';
import { therapists } from '../data/data';

@Injectable()
export class TherapistSeederService {

  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Therapist)
    private readonly therapistRepository: Repository<Therapist>,
  ) {}
  /**
   * Seed all therapists.
   *
   * @function
   */
  create(): Array<Promise<Therapist>> {
    return therapists.map(async (therapist: ITherapist) => {
    console.log("🚀 ~ file: therapist-seeder.service.ts ~ line 29 ~ TherapistSeederService ~ returntherapists.map ~ therapist", therapist)
      
        return await this.userRepository.findOne({ email: therapist.email })
        .then(async dbLang => {
            if (dbLang) {
                return Promise.resolve(null);
            }
            return Promise.resolve(this.createTherapist(therapist));
        })
        .catch(error => Promise.reject(error));        
    });
  }

  async createTherapist(therapist: ITherapist) {
    let newUser = new User();
    newUser.password = '123456';   
    newUser.role = Role.THERAPIST; 
    newUser.firstName = therapist.firstName;
    newUser.email = therapist.email;
    newUser.mobileNumber = therapist.mobileNumber;    
    const user = await this.userRepository.save(newUser); 
    
    therapist.user = user;
    await this.therapistRepository.save(therapist);
  }

}
