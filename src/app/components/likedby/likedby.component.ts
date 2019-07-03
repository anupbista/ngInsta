import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-likedby',
  templateUrl: './likedby.component.html',
  styleUrls: ['./likedby.component.css']
})
export class LikedbyComponent implements OnInit {

  postID: string ="";
  likes= [];
  user;
  loading: any;
  userSubsciption: Subscription;

  constructor(private route: ActivatedRoute,
     private _userService: UserService,
     private router: Router,
     private _authService: AuthService,
     private _postService: PostsService) { }

  ngOnInit() {
    this.loading = true;
    this.userSubsciption = this.route.parent.url.pipe(switchMap( (urlPath)=> {
      this.postID = urlPath[1].path;
      console.log(this.postID)
      return this._userService.user;
    } )).subscribe(async (user: any ) => {
      this.user = user;
      await this.getLikesByPostId();
    })

  }
  async getLikesByPostId(){
    try {
      this.likes = await this._postService.getLikesByPostId(this.postID, this.user.id);
      this.loading = false;
      console.log(this.likes);
    } catch (error) {
      console.log(error)
    }
  }

  ngOnDestroy(): void {
    this.userSubsciption.unsubscribe();
  }

  closePostDetail(){
    let routerLink = this.route.parent.snapshot.pathFromRoot
    .map(s => s.url).reduce((a, e) => a.concat(e)).map(s => s.path);
    this.router.navigate(routerLink);
  }

  async follow(follower: any){
    try {
      let data = {
        userId: this.user.id,
        aliasId: follower.id
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