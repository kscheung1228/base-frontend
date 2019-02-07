import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        
        let currentUser = this.authenticationService.currentUserValue;
        // console.log('currentUser',currentUser)
        
        // for (let key in currentUser) {
        //     let value = currentUser[key];
        //     // Use `key` and `value`
        //     console.log('key,value ',key,value)
        // }
        if (currentUser && currentUser.access) {
            console.log('currentUserTOKEN',currentUser.access)
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.access}`
                }
            });
        }

        return next.handle(request);
    }
}