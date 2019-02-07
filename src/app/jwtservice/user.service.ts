import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })



@Injectable({ providedIn: 'root' })
export class UserService {
    apiEndpoint = environment.APIEndpoint;
    private baseUrl = this.apiEndpoint + 'api/token/';  // URL to web api
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>((this.baseUrl));
    }
}