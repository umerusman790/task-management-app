import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { classToPlain } from 'class-transformer';



@Injectable()
export class UserResInterceptor implements NestInterceptor {


    ////intercept Methods start here
  intercept(context: ExecutionContext, next: CallHandler) {



    //// this execute when route handler returns response
    return next.handle().pipe(map(data => classToPlain(data)));
  }
}