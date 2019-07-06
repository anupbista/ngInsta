import { Injectable } from "@angular/core";
import { tap, map, catchError, finalize } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { LoaderService } from "./loader.service";

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  constructor(private toast: ToastrService, private router: Router, public loaderService: LoaderService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.loaderService.show();
    
    if (request.headers.has(InterceptorSkipHeader)) {
        const headers = request.headers.delete(InterceptorSkipHeader);
        return next.handle(request.clone({ headers }));
      }

    // const updatedRequest = request.clone({
    //   headers: request.headers.set("Authorization", "Some-dummyCode")
    // });
    
    return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // success response
            }
            return event;
        }),
        catchError((error: HttpErrorResponse) => {
            let data = {};
            data = {
                reason: error && error.error && error.error.reason ? error.error.reason : '',
                status: error.status
            };
            if(error.status === 401){
                this.toast.error("Unauthorized");
                localStorage.removeItem("token");
                localStorage.removeItem("expiresIn");
                localStorage.removeItem("userId");
                this.router.navigate(['/login']);
            }
            else if(error.status === 0){
                this.toast.error("Unauthorized");
                localStorage.removeItem("token");
                localStorage.removeItem("expiresIn");
                localStorage.removeItem("userId");
                this.router.navigate(['/login']);
            }else{
                this.toast.error("Something is wrong. Please try again.");
            }
            
            return throwError(data);
        }),
        finalize(() => this.loaderService.hide())
        );

  }
}