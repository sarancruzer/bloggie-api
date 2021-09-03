import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AuthModule } from './app/auth/auth.module';
import { SharedModule } from './app/shared/shared.module';
import { UsersModule } from './app/users/users.module';
import { ConfigModule } from '@nestjs/config';
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

import { AuthorizationMiddleware } from './authorization.middleware';
import { BlogsModule } from './app/blogs/blogs.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    SharedModule,
    MailerModule.forRoot(mailerOptions),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule, 
    BlogsModule
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
