 
 
 import { createParamDecorator, ExecutionContext } from '@nestjs/common';
 import { Admin } from './admin.entity';
  
  
  export const GetAdmin = createParamDecorator((data, ctx: ExecutionContext): Admin => {
         const req = ctx.switchToHttp().getRequest();
          return req.user.email;
      });