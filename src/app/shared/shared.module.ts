import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommonService } from './services/common.service';
import { JwtCustomService } from './services/jwt-custom.service';
import { MailService } from './services/mail/mail.service';

@Module({
  providers: [CommonService, MailService, JwtCustomService, ConfigService],
  exports:[
    CommonService,
    MailService,
    JwtCustomService
  ],
})
export class SharedModule {}
