import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import { AssessmentModule } from './app/assessment/assessment.module';
import { AuthModule } from './app/auth/auth.module';
import { ClinicModule } from './app/clinic/clinic.module';
import { QuestionModule } from './app/question/question.module';
import { SharedModule } from './app/shared/shared.module';
import { TherapistModule } from './app/therapist/therapist.module';
import { UsersModule } from './app/users/users.module';
import { AppointmentsModule } from './app/appointments/appointments.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';



const mailerOptions = {
  transport: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    ignoreSSL: false,
    auth: {
      user: 'sarancruzer@gmail.com',
      pass: '9597009544Ss',
    },
  },
  defaults: {
    from:'"nest-modules" <modules@nestjs.com>',
  },
  template: {
    dir: __dirname + '/templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};

import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AuthorizationMiddleware } from './authorization.middleware';

@Module({
  imports: [
    UsersModule,
    AssessmentModule,
    ClinicModule,
    TherapistModule,
    AuthModule,
    SharedModule,
    QuestionModule,
    MailerModule.forRoot(mailerOptions),
    AppointmentsModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    WinstonModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transports: [
          new winston.transports.File({
            filename: `${process.cwd()}/${configService.get('LOG_PATH')}`,
          }),
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.timestamp(),
              utilities.format.nestLike(),
            ),
          }),
        ],
      }),
      inject: [ConfigService],
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor() {}
  configure(userContext: MiddlewareConsumer){
    userContext.apply(AuthorizationMiddleware)
    .forRoutes({ path: '**', method: RequestMethod.ALL }); 
 }
    
}
