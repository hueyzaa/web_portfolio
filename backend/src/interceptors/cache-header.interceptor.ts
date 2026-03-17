import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Response, Request } from 'express';

@Injectable()
export class CacheHeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();
    const request = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      tap(() => {
        console.log(`Checking request: ${request.method} ${request.url}`);
        if (
          request.method === 'GET' &&
          (request.url.includes('/public/') || request.url.includes('/news'))
        ) {
          console.log(`Setting headers for ${request.url}`);
          if (request.url.includes('projects')) {
            response.setHeader('Cache-Control', 'public, max-age=3600');
          } else if (request.url.includes('skills')) {
            response.setHeader('Cache-Control', 'public, max-age=600');
          } else if (request.url.includes('news')) {
            response.setHeader('Cache-Control', 'public, max-age=1800');
          } else {
            response.setHeader('Cache-Control', 'public, max-age=300');
          }
        }
      }),
    );
  }
}
