 
 
 import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Reader } from './reader.entity';
 
  
  
  export const GetReader = createParamDecorator((data, ctx: ExecutionContext): Reader => {
         const req = ctx.switchToHttp().getRequest();
         console.log(req);
          return  req.user;
      });