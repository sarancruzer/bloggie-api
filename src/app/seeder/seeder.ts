import { Injectable } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { TherapistSeederService } from "./therapist-seeder/therapist-seeder.service";

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger ,
    private readonly therapistSeederService: TherapistSeederService,
  ) {}
  async seed() {
    await this.therapists()
      .then(completed => {
        this.logger.debug('Successfuly completed seeding therapist...');
        Promise.resolve(completed);
      })
      .catch(error => {
        this.logger.error('Failed seeding therapist...');
        Promise.reject(error);
      });
  }
  async therapists() {
    return await Promise.all(this.therapistSeederService.create())
      .then(createdTherapists => {
        // Can also use this.logger.verbose('...');
        
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }
}