import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;
  constructor(private router: Router, private httpClient: HttpClient){
    
  }

  doRegister(form){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Skip-Interceptor': '',
    });
    let options = { headers: headers };
    let data = {
      email: form.email,
      password: form.password,
      username: form.username,
      userImage: 'uploads/profile/default-user.png',
      displayName: form.displayName
    }
    return this.httpClient.post(environment.api+"auth/signup", data, options).toPromise()
  }

  doLogin(form): Promise<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Skip-Interceptor': '',
    });
    let options = { headers: headers };

    let data = {
      email: form.value.email,
      password: form.value.password
    }
    return this.httpClient.post(environment.api+"auth/signin", data, options).toPromise()
  }

  setSession(authResult) : Promise<any>{
    return new Promise( (resolve, reject) => {
      try {
        const expiresAt = moment().add(authResult.expiresIn,'second');
        localStorage.setItem('token', authResult.token);
        localStorage.setItem("expiresIn", JSON.stringify(expiresAt.valueOf()) );
        // localStorage.setItem('userId', authResult.userId);
        if(localStorage.token){
          resolve(localStorage.token);
        }else{
          reject("No token")
        }
      } catch (error) {
        reject(error)
      }
    } );
  }          

  public isAuthenticated() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isAuthenticated();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expiresIn");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }
  
  doLogout(key): Promise<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + key});
    let options = { headers: headers };

    let data = {
      token: localStorage.token
    }
    return this.httpClient.post(environment.api+"auth/signout", data, options).toPromise();
  }

}
