import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DatabaseType } from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
          useFactory: async (mysqlConfigService: any) => ({
            type: 'postgres' as DatabaseType,
            host: 'localhost',
            port: '5432',
            username: 'postgres',
            password: 'postgres',
            database: 'auticare-dev',
            entities: [
                join(__dirname, '..', '..', '/*/entities/**/*.entity.ts')
              ],
            synchronize: true,
          }),       
        } as TypeOrmModuleAsyncOptions),
      ]
})
export class ProviderModule {
    constructor() {
        let dirname = join(__dirname, '..', '..', '/*/entities/**/*.entity.ts');
    }
}
