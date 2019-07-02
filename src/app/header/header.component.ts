import { Component, OnInit, NgZone,ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../Models/User';
import { FormControl } from '@angular/forms';
import { switchMap, debounceTime, distinctUntilChanged, mergeMap, flatMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isShrunk: boolean = false;
  animatePlaceholder: boolean = false;
  @ViewChild('headersearch') headersearch: ElementRef;
  user: User;
  notis: any[] = [];
  searchloading: boolean = false;
  searchResults: User[] = [];
  usersearch: FormControl = new FormControl();
  searchInputText: "Search";
  showResults: boolean = false;

  showNotis: boolean = true;
  showFollowReq: boolean = false;

  followRequests: any[] = [];
  noFollowRequests: number = 0;
  otherNotis: [];
  notiLoading:boolean = false;
  showNotiDot: boolean = false;

  userSubscription: Subscription;

  constructor(zone: NgZone, private _userService: UserService, private _authService: AuthService, private _postService: PostsService) {
    window.onscroll = () => {
      zone.run(() => {
        if(window.pageYOffset > 100) {
             this.isShrunk = true;
        } else {
             this.isShrunk = false;
        }
      });
    }
  }
  ngOnInit() {
    this.userSubscription = this._userService.user.subscribe(
      (user) => {
        this.user = user;
        this.getOtherNotis();
        this.getFollowNotis();
        // console.log(this.user)
      }
    );
    this.usersearch.valueChanges
    .pipe(debounceTime(200))
    .pipe(distinctUntilChanged())
    .pipe(flatMap( (query) => {
      this.searchloading = true;
      this.showResults= true;
      this.searchResults= [];
      return this._userService.searchUser(query)
    }))
    .subscribe(
      (response: any) => {
        // console.log(response);
        this.searchloading = false;
        if(response.length == 0){
          this.showResults= true;
          // console.log("No resultfound.")
        }else{
          this.showResults= true;
          this.searchResults = response;
        }
      })
      
  }

  async getOtherNotis(){
    this.notiLoading = true;
    this.otherNotis  = await this._userService.getOtherNotifications('8d4fdc8f-d393-498b-a078-08fc304c6c9c');
    this.notiLoading = false;
    this.otherNotis.map(
      (otherNoti: any) => {
        if(otherNoti.status === false){
          this.showNotiDot = true;
        }
        return otherNoti;
      }
    );
    console.log(this.otherNotis);
  }

  async getFollowNotis(){
    this.notiLoading = true;
    this.followRequests  = await this._userService.getFollowNotifications('7fb55c72-ff40-4492-974b-33e3309de25d');
    this.notiLoading = false;
    this.noFollowRequests = this.followRequests.length;
    this.followRequests.map(
      (followNoti: any) => {
        if(followNoti.status === false){
          this.showNotiDot = true;
        }
        return followNoti;
      }
    );
    console.log(this.followRequests);
  }


  loadNotis(){
    this.getFollowNotis();
    this.getOtherNotis();
  }

  dosetSeen(){
    setTimeout( () => {
      this.showNotiDot = false;
    }, 5000)
  }
  
  toAnimatePlaceholder(){
    this.headersearch.nativeElement.placeholder= "Search";
    this.animatePlaceholder = true;
  }
  noAnimatePlaceholder(){
    this.headersearch.nativeElement.placeholder= "";
    this.headersearch.nativeElement.blur();
    this.animatePlaceholder = false;
    if(this.usersearch.value == ""){
      this.showResults= false;
      this.searchResults= [];
    }
  }

  showFollowRequets($event){
    $event.preventDefault();
    $event.stopPropagation();
    this.showNotis = false;
    this.showFollowReq = true;
  }

  doshowNotis($event){
    $event.preventDefault();
    $event.stopPropagation();
    this.showNotis = true;
    this.showFollowReq = false;
  }

  async approveFollowReq($event, userId, aliasId, requestId){
    $event.stopPropagation();
    let data = {
      userId: userId,
      aliasId: aliasId
    }
    await this._userService.approveFollow(data);
    this.followRequests = this.followRequests.filter( (request: any) => {
      return request.id != requestId;
    } )
  }

  async hideFollowReq($event, userId: string, aliasId: string, requestId:string){
    $event.stopPropagation();
    let data = {
      userId: userId,
      aliasId: aliasId
    }
    await this._userService.unFolllowUser(data);
    this.followRequests = this.followRequests.filter( (request: any) => {
      return request.id != requestId;
    } )
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  
}
