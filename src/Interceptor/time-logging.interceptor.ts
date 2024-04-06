import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        const end = Date.now();
        const response = context.switchToHttp().getResponse();
        const request = context.switchToHttp().getRequest();
        const time = end - start;
        const domTimeHeader = request.headers['x-dom-time'];
        let domTime = 0;
        if (domTimeHeader) {
          domTime = parseInt(domTimeHeader, 10);
        }
        const totalTime = time + domTime;
        response.setHeader('X-Total-Time', `${totalTime}ms`);
      }),
    );
  }
}