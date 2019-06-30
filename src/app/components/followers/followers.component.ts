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
  followers: User[] = [];
  followerLoading: boolean = true;
  page: number = 1;
  user;
  accountUser;
  userSubscription: Subscription;

  constructor(private route: ActivatedRoute,
     private _userService: UserService,
     private router: Router,
     private _authService: AuthService) { }

  ngOnInit() {
    this.route.parent.url.subscribe(
      async (urlPath: UrlSegment[]) => {
        try {
          this.username = urlPath[urlPath.length - 1].path;
          this.user = await this._userService.getUserByUsername(this.username);
          this.followers = await this._userService.getFollowers(this.user.id, 1);
          // console.log(this.followers)
          this.followerLoading = false;
        } catch (error) {
          console.log(error)
        }
       
      }
    )
    this.userSubscription = this._userService.user.subscribe( user => { 
      this.accountUser = user;
      // console.log(this.accountUser) 
    }, error => { console.log(error) })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
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
        userId: follower.aliasId,
        aliasId: follower.user.id
      }
      let follow = await this._userService.followUser(data);
      if(follow){
         if(follower.user.privateProfile){
          follower.user.status = {
            followRequested: 1
          }
         }else{
          follower.user.status = {
            followRequested: 0
          }
         }
      }
    } catch (error) {
      console.log(error)
    }
  }

}
