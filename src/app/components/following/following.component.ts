import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { take, map, finalize, flatMap, switchMap, mergeMap } from 'rxjs/operators';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  username: string ="";
  user;
  following: User[] = [];
  followingLoading: boolean = true;
  page: number = 1;

  constructor(private route: ActivatedRoute,
    public _userService: UserService,
     private router: Router,
     private _authService: AuthService) { }

  async getInit(){
    if(!this._userService.user) await this._userService.getCurrentUser();
    this.username = this.router.url.split('/')[2];
      this.getFollowing();
  }

  ngOnInit() {
   this.getInit();
  }

  async getFollowing(){
    try {
      this.user = await this._userService.getUserByUsername(this.username);
      // console.log(this.user);
      this.following = await this._userService.getFollowing(this.user.id, 1);
      this.followingLoading = false;
    } catch (error) {
      console.log(error)
    }
  }

  closePostDetail(){
    let routerLink = this.route.parent.snapshot.pathFromRoot
    .map(s => s.url).reduce((a, e) => a.concat(e)).map(s => s.path);
    this.router.navigate(routerLink);
  }

  async loadInfiniteFollowing(){
    this.followingLoading = true;
    this.page = this.page + 1;
    let following = await this._userService.getFollowing(this.user.id, this.page);
    this.following = [...this.following, ...following];
    console.log(this.following);
    this.followingLoading = false;
  }

  async follow(follower: any){
    try {
      let data = {
        userId: this._userService.user.id,
        aliasId: follower.id
      }
      let follow = await this._userService.followUser(data);
      if(follow){
         if(follower.privateProfile){
          follower.status = {
            followRequested: true
          }
         }else{
          follower.status = {
            followRequested: false
          }
         }
      }
    } catch (error) {
      console.log(error)
    }
  }

}
