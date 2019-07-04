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
  following: User[] = [];
  followingLoading: boolean = true;
  page: number = 1;
  user;
  accountUser;
  userSubscription: Subscription;

  constructor(private route: ActivatedRoute,
     private _userService: UserService,
     private router: Router,
     private _authService: AuthService) { }

  ngOnInit() {
    console.log("Following")
    this.route.parent.url.subscribe(
      async (urlPath: UrlSegment[]) => {
        try {
          this.username = urlPath[urlPath.length - 1].path;
          this.user = await this._userService.getUserByUsername(this.username);
          // console.log(this.user);
          this.following = await this._userService.getFollowing(this.user.id, 1);
          this.followingLoading = false;
        } catch (error) {
          console.log(error)
        }
      }
    )
    this.userSubscription = this._userService.getCurrentUser().subscribe( user => { this.accountUser = user }, error => { console.log(error) })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
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
        userId: this.user.id,
        aliasId: follower.id
      }
      let follow = await this._userService.followUser(data);
      if(follow){
         if(follower.privateProfile){
          follower.status = {
            followRequested: 1
          }
         }else{
          follower.status = {
            followRequested: 0
          }
         }
      }
    } catch (error) {
      console.log(error)
    }
  }

}
