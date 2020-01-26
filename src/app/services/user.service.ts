import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../Models/User';
import { environment } from 'src/environments/environment';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  profileImageApi: string;
  user: User;
  aliasuser: User;
  userSubscription: Subscription;
  token: any;

  constructor( private router: Router, private _authService: AuthService, private _apiserviceService: ApiserviceService){
    this.profileImageApi = environment.profileImageApi;
  } 
  
  async getCurrentUser(){
    this.token = localStorage.getItem('token');
    this.user = await this._apiserviceService.ngInstaGet("user/"+this.token, this.token);
    console.log(this.user)
  }

  getUser(userId): Promise<any>{
    return this._apiserviceService.ngInstaGet("user/profile/"+userId, localStorage.token);
  }

  getLocation(geoLocationAPI): Promise<any>{
    return this._apiserviceService.otherAPIGet(geoLocationAPI);
  }

  getUserByUsername(username): Promise<any>{
    return this._apiserviceService.ngInstaGet("user/user/"+username, localStorage.token);
  }

  getUserProifle(username): Promise<any>{
    return this._apiserviceService.ngInstaGet("user/user/"+username, localStorage.token);
  }

  getFollowers(userId, page): Promise<any>{
    return this._apiserviceService.ngInstaGet("user/profile/"+userId+"/followers/"+page, localStorage.token);
  }

  getFollowing(userId, page): Promise<any>{
    return this._apiserviceService.ngInstaGet("user/profile/"+userId+"/following/"+page, localStorage.token);
  }

  followUser(data): Promise<any>{
    return this._apiserviceService.ngInstaPost(data, "alias/follow", localStorage.token);
  }

  unFolllowUser(data): Promise<any>{
    return this._apiserviceService.ngInstaPost(data, "alias/unfollow", localStorage.token);
  }

  approveFollow(data): Promise<any>{
    return this._apiserviceService.ngInstaPut(data, "alias/approvefollow", localStorage.token);
  }

  getUserProfile(userId, id): Promise<any>{
    return this._apiserviceService.ngInstaGet("user/userprofile/"+userId+"?id="+id, localStorage.token);
  }

  searchUser(queryString: string){
    return this._apiserviceService.ngInstaGetObservable("user/search?text="+queryString, localStorage.token);
  }

  updateUser(id:string ,user: User){
    return this._apiserviceService.ngInstaPut(user, "user/profile/"+id, localStorage.token);    
  }

  updateUserImage(id:string ,image){
    return this._apiserviceService.ngInstaPutImage(image, "user/profile/"+id+"/profileimage", localStorage.token);    
  }

  getOtherNotifications(userId, page): Promise<any>{
    return this._apiserviceService.ngInstaGet("user/othernotifications/"+userId+"/"+page, localStorage.token);
  }

  getFollowNotifications(userId): Promise<any>{
    return this._apiserviceService.ngInstaGet("user/follownotifications/"+userId, localStorage.token);
  }

  getUserSuggestions(userId): Promise<any>{
    return this._apiserviceService.ngInstaGet("user/suggestions/"+userId, localStorage.token);
  }

  updateNotification(data){
    return this._apiserviceService.ngInstaPut(data, "user/notification", localStorage.token);    
  }

}
