import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { SpinnerStore } from '@/store/spinner.store';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private spinnerStore:SpinnerStore) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerStore.show()
    return next.handle(request).pipe(
      // delay(2000),
      finalize(()=> this.spinnerStore.hide())
    );
  }
}
