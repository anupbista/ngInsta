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
import { CommonService } from './common.service';
import { UserService } from './user.service';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  constructor(private toast: ToastrService, private router: Router, public loaderService: LoaderService, private _commonService: CommonService, public _userService: UserService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.loaderService.show();
    
    if (request.headers.has(InterceptorSkipHeader)) {
        const headers = request.headers.delete(InterceptorSkipHeader);
        return next.handle(request.clone({ headers }));
      }
    
    return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
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
                this._commonService.userDisconnect(localStorage.userId);
                if (this._userService.userSubscription) this._userService.userSubscription.unsubscribe();
                localStorage.removeItem("token");
                localStorage.removeItem("expiresIn");
                localStorage.removeItem("userId");
                this.router.navigate(['/login']);
                this._commonService.socket = null;
            }
            else if(error.status === 0){
                this.toast.error("Unauthorized");
                this._commonService.userDisconnect(localStorage.userId);
                if (this._userService.userSubscription) this._userService.userSubscription.unsubscribe();
                localStorage.removeItem("token");
                localStorage.removeItem("expiresIn");
                localStorage.removeItem("userId");
                this._commonService.socket = null;
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