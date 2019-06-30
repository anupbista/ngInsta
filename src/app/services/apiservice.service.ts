import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { }

  async ngInstaGet(api, key): Promise<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + key});
    let options = { headers: headers };
    return await this.http.get(environment.api+api, options).toPromise();
  }

  ngInstaGetObservable(api, key): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + key});
    let options = { headers: headers };
    return this.http.get(environment.api+api, options);
  }

  async ngInstaPost(data, api, key): Promise<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + key});
    let options = { headers: headers };
    return await this.http.post(environment.api+api, data, options).toPromise();
  }

  async ngInstaPostImage(data, api, key): Promise<any>{
    let headers = new HttpHeaders({
      'Authorization': "Bearer " + key});
    let options = { headers: headers };
    return await this.http.post(environment.api+api, data, options).toPromise();
  }

  async ngInstaPut(data, api, key): Promise<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + key});
    let options = { headers: headers };
    return await this.http.put(environment.api+api, data, options).toPromise();
  }

  async ngInstaPutImage(data, api, key): Promise<any>{
    let headers = new HttpHeaders({
      'Authorization': "Bearer " + key});
    let options = { headers: headers };
    return await this.http.post(environment.api+api, data, options).toPromise();
  }

  async ngInstaDelete(api, key): Promise<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + key});
    let options = { headers: headers };
    return await this.http.delete(environment.api+api, options).toPromise();
  }

}
