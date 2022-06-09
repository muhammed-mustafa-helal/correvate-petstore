import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserAuthenticationService {
  isLoggedIn: boolean = false;
  constructor(private http: HttpClient) {}

  loginUser(username: string, password: string) {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    return this.http.get(
      `${environment.apiUrl}/user/login?username=${username}&password=${password}`
    );
  }
  logoutUser() {
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    return this.http.get(`${environment.apiUrl}/user/logout`);
  }
}
