import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserTokenDto } from 'src/app/auth/dto/login-user.dto';
import { User } from 'src/app/users/entities/user.entity';
import config from 'src/config/config';
var otpGenerator = require('otp-generator')
import { authenticator } from 'otplib';
import { IUser } from 'src/app/users/interface/user.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {

    secret = '';
    constructor(
      private readonly mailerService: MailerService,
      private readonly configService: ConfigService
      ) {
        this.secret = this.configService.get('JWT_SECRET')
      }


    userVerificationEmail(userData: IUser, token: string): void {        

    authenticator.options = { 
      digits: 4,
      epoch: Date.now(),
      step: 600,
     };
    const otpcode = authenticator.generate(this.secret);

    const data = {
        name: userData.firstName + ' ' + userData.lastName ,
        verifyLink: config.appUrl + 'auth/verify/otp',
        otp: otpcode,
      };

    const toEmail = userData.email;
    const subject = 'Email verification - Auticare';
    const template = './userEmailVerify';
    const context = data;
    this.sendMail(toEmail, subject, template, context);
  }
  
  forgotPasswordEmail(userData: IUser, token: string): void {        

    authenticator.options = { 
      digits: 4,
      epoch: Date.now(),
      step: 600, 
     };
    const otpcode = authenticator.generate(this.secret);

    const data = {
        name: userData.firstName + ' ' + (userData.lastName) ? userData.lastName: '',
        verifyLink: config.appUrl + 'auth/verify/otp',
        otp: otpcode,
      };

    const toEmail = userData.email;
    const subject = 'Forgot Password - Auticare';
    const template = './forgotPassword';
    const context = data;
    this.sendMail(toEmail, subject, template, context);
  }

  sendMail(toEmail: any, subject: string, template: string, context: any): void {  

    this.mailerService.sendMail({
        to: [toEmail, 'sarancruzer@gmail.com'],
        from: config.mail.senderMail,
        replyTo: config.mail.senderMail,
        sender: 'Auticare Official',
        subject: subject,
        template: template,
        context: context,

      }).then((res) => {
      }).catch((err) => {
      });  
}
  
  
}
