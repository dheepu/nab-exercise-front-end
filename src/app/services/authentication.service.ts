import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/LoginResponse';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  currentUser: Observable<LoginResponse>;

  private currentUserSubject: BehaviorSubject<LoginResponse>;

  registerUser(body) {
    return this.http.post('http://localhost:4000/user/register', body);
  }

  public get currentUserValue(): LoginResponse {
    return this.currentUserSubject.value;
  }

  login(body) {
    return this.http.post<LoginResponse>('http://localhost:4000/user/login', body).map(response => {
      localStorage.setItem('currentUser', JSON.stringify(response));
      this.currentUserSubject.next(response);
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
