import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  addPushSubscriber(userId:string, sub: any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + localStorage.token});
    let options = { headers: headers };
    let data = {
      sub: sub
    }
    return this.httpClient.put(environment.api + "user/addPushSubscriber/" + userId ,data, options)
  }
}
