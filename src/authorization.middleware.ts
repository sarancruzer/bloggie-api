import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
   constructor(){
   }
   async use(req: Request, res: Response, next: NextFunction){      
      next();  
   }
}