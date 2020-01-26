import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { take, map, finalize, flatMap, switchMap, mergeMap } from 'rxjs/operators';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/services/auth.service';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  username: string ="";
  user;
  followers: User[] = [];
  followerLoading: boolean = true;
  page: number = 1;

  constructor(private route: ActivatedRoute,
    public _userService: UserService,
     private router: Router,
     private _authService: AuthService) { }

  async getInit(){
    if(!this._userService.user) await this._userService.getCurrentUser();
    this.username = this.router.url.split('/')[2];
    this.getFollowers();
  }

  ngOnInit() {
    this.getInit();
  }

  async getFollowers(){
    this.user = await this._userService.getUserByUsername(this.username);
    this.followers = await this._userService.getFollowers(this.user.id, 1);
    this.followerLoading = false;
  }

  closePostDetail(){
    let routerLink = this.route.parent.snapshot.pathFromRoot
    .map(s => s.url).reduce((a, e) => a.concat(e)).map(s => s.path);
    this.router.navigate(routerLink);
  }

  async loadInfiniteFollowers(){
    this.followerLoading = true;
    this.page = this.page + 1;
    let followers = await this._userService.getFollowers(this.user.id, this.page);
    this.followers = [...this.followers, ...followers];
    console.log(this.followers);
    this.followerLoading = false;
  }

  async follow(follower: any){
    try {
      let data = {
        userId: this._userService.user.id,
        aliasId: follower.user.id
      }
      let follow = await this._userService.followUser(data);
      if(follow){
         if(follower.user.privateProfile){
          follower.user.status = {
            followRequested: true
          }
         }else{
          follower.user.status = {
            followRequested: false
          }
         }
      }
    } catch (error) {
      console.log(error)
    }
  }

}
