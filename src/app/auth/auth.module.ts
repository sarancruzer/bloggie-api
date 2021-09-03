import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonService } from "../shared/services/common.service";
import { JwtCustomService } from "../shared/services/jwt-custom.service";
import { MailService } from "../shared/services/mail/mail.service";
import { SharedModule } from "../shared/shared.module";
import { User } from "../users/entities/user.entity";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { JwtStrategy } from "./auth-strategy/jwt.strategy";
import { LocalStrategy } from "./auth-strategy/local.strategy";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { AUTH_SERVICE } from "./interface/auth.interface";
import * as winston from 'winston';
import { WinstonModule } from "nest-winston";
import { AuthorizationMiddleware } from "src/authorization.middleware";
import { Follow } from "../users/entities/follow.entity";

let configService = new ConfigService();


@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: configService.get('JWT_SECRET'),
      signOptions: {expiresIn:  configService.get('JWT_EXPIRESIN')}
    }),
    TypeOrmModule.forFeature([User, Follow]),
    SharedModule,
    WinstonModule.forRoot({
      // options
    }),
  ],
  providers: [
    { useClass: AuthService, provide: AUTH_SERVICE },
    AuthService,
    LocalStrategy,
    JwtStrategy, 
    UsersService,
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {
  
}
