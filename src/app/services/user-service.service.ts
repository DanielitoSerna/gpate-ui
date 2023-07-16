import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl="http://localhost:8080/api/login";

  constructor(private httpClient: HttpClient) { }

  loginService(request: User):  Observable<object> {
    console.log(request);
    return this.httpClient.post(`${this.baseUrl}`, request);
  }
}
