import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../Models/User';
import { environment } from 'src/environments/environment';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  profileImageApi: string;
  user: Observable<User>;

  currentUser: User;
  localUser: User;

  constructor( private router: Router, private _authService: AuthService, private _apiserviceService: ApiserviceService){
    this.profileImageApi = environment.profileImageApi;
    this.setCurrentUser();
  }

  updateRegisterProfile(formValue){

  }

  addUser(formData){
    
  }
  
  getCurrentUser(): Observable<User>{
    return this._apiserviceService.ngInstaGetObservable("user/"+localStorage.token, localStorage.token);
  }

  async setCurrentUser(){
    this.user = this.getCurrentUser();
    this.getCurrentUser().subscribe(user=> this.currentUser = user)
  }

  getUser(userId): Promise<any>{
    return this._apiserviceService.ngInstaGet("user/profile/"+userId, localStorage.token);
  }

  getLocation(googMapApi): Promise<any>{
    return this._apiserviceService.ngInstaGet(googMapApi, localStorage.token);
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

  getOtherNotifications(userId): Promise<any>{
    return this._apiserviceService.ngInstaGet("user/othernotifications/"+userId, localStorage.token);
  }

  getFollowNotifications(userId): Promise<any>{
    return this._apiserviceService.ngInstaGet("user/follownotifications/"+userId, localStorage.token);
  }

  getAllUser(){
  
  }

  getSuggestedUser(){
    
  }

  getThisUser(username: string){
   
  }

  getTheUser(username: string){
    
  }

  getThisUserByUID(uid: string){
    
  }

  getThisUserFollowers(uid: string){
    
  }

  getThisUserFollowing(uid: string){
    
  }


  uploadProfilePicture(event:any){

  }

  doFollow(followingUID:string){
   
  }

  doFollowFromReq(followingUID:string){
   
  }

  doUnfollow(followingUID:string){
   
  }

  doFolllowStatus(followingUID:string){
    
  }

  doFolllowReqStatus(followingUID:string){
    
  }

  requestFollow(uid:string, followreqUID: string){
  
  }

  removeRequestFollow(uid:string, followreqUID: string){

  }

  removeRequestFollowByOwner(uid:string, followreqUID: string){
  
  }

  removeNoti(uid:string, followreqUID: string){
  
  }

  getFollowReqNotifications(uid: string){

  }

  removeThisNoti(notiID: string, uid: string){
  }

  createNotifications(uid: string, fuid: string){
  
  }

  setNotiSeen(notiID: string){
   
  }

}
