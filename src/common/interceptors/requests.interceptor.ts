import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { requestContext } from '../context/request-context';

@Injectable()
export class RequestsInterceptor implements NestInterceptor {
    
    private readonly logger = new Logger(RequestsInterceptor.name)
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const startTime = Date.now()
        
        const request = context.switchToHttp().getRequest()
        const response = context.switchToHttp().getResponse()

        const { method, url } = request

        return next.handle().pipe(
            tap({
                next: (data) => {
                    const endTime = Date.now()
                    const duration = endTime - startTime
                    const { statusCode } = response;
                    const requestId = requestContext.getStore()?.requestId;

                    this.logger.verbose(
                    `[${requestId}] - ${method} ${url} - ${statusCode} - ${duration}ms`,
                    );
                },
                error : (error) => {
                    const endTime = Date.now()
                    const duration = endTime - startTime
                    const { statusCode } = response;
                    const requestId = requestContext.getStore()?.requestId;

                    this.logger.error(
                    `[${requestId}] - ${method} ${url} - ${statusCode} - ${duration}ms - Error: ${error?.message}`
                    );
                }
            })
        )
    }
}