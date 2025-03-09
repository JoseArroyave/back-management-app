import { ExecutionContext, NestInterceptor, HttpException, CallHandler, Injectable } from "@nestjs/common";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

export interface IResponse {
  message: string;
  status: number;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor<IResponse> {
  constructor() {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse> {
    return next.handle().pipe(
      map((data) => ({
        status: data.status,
        message: data.message,
      })),
      catchError((err) => {
        const message = err?.response?.message || err?.message || err?.detail || "Something went wrong";
        const status = err.status || 500;
        return throwError(() => new HttpException({ status: 2, message: message }, status));
      })
    );
  }
}
