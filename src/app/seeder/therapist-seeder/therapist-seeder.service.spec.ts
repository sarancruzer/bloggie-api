import { Test, TestingModule } from '@nestjs/testing';
import { TherapistSeederService } from './therapist-seeder.service';

describe('TherapistSeederService', () => {
  let service: TherapistSeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TherapistSeederService],
    }).compile();

    service = module.get<TherapistSeederService>(TherapistSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
