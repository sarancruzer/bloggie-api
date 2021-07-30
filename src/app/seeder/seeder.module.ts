import { Logger, Module } from '@nestjs/common';
import { ProviderModule } from './provider/provider.module';
import { Seeder } from './seeder';
import { TherapistSeederModule } from './therapist-seeder/therapist-seeder.module';

@Module({
    imports: [ProviderModule, TherapistSeederModule ],
    providers: [Logger, Seeder],
  })
export class SeederModule {}
