import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseDto } from '../dto/response.dto';
var uniqid = require('uniqid');

@Injectable()
export class CommonService {

  constructor(private configService: ConfigService) { }

  async getConfig(key: string) {
    let dd = await this.configService.get(key);
    console.log("🚀 ~ file: common.service.ts ~ line 12 ~ CommonService ~ getConfig ~ dd", dd)
    return dd;
  }

  async customResponse(data: object, message: string, status: string) {
    const dto = new ResponseDto();
    dto.status = status;
    dto.message = message;
    dto.data = data;
    return dto;
  }

  async customResponseToken(data: object, message: string, status: string, roleModules?: any) {
    const dto = new ResponseDto();
    dto.status = status;
    dto.message = message;
    dto.data = data;

    return dto;
  }

  generateUID() {
    // I generate the UID from two parts here 
    // to ensure the random number provide enough bits.
    let firstPart = ((Math.random() * 46656) | 0).toString();
    let secondPart = ((Math.random() * 46656) | 0).toString();
    firstPart = ("000" + firstPart).slice(-3);
    secondPart = ("000" + secondPart).slice(-3);
    let uuid = firstPart + secondPart;
    return uuid;
  }

  async generatePassword() {
    let randNumber = Math.round(Date.now() / 1000).toString();
    randNumber = randNumber.substr(randNumber.length - 7);
    let randUniqid = uniqid().toUpperCase();
    randUniqid = randUniqid.substr(randUniqid.length - 7);
    let userCode = randUniqid + randNumber;
    return userCode;
  }


}
