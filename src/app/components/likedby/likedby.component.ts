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
  loading: any;

  constructor(private route: ActivatedRoute,
    public _userService: UserService,
     private router: Router,
     private _authService: AuthService,
     private _postService: PostsService) { }

  async getInit(){
    if(!this._userService.user) await this._userService.getCurrentUser();
    this.loading = true;
    this.postID = this.router.url.split('/')[2];
    this.getLikesByPostId();
  }

  ngOnInit() {
    this.getInit();  
  }

  async getLikesByPostId(){
    try {
      this.likes = await this._postService.getLikesByPostId(this.postID, this._userService.user.id);
      this.loading = false;
      console.log(this.likes);
    } catch (error) {
      console.log(error)
    }
  }

  closePostDetail(){
    let routerLink = this.route.parent.snapshot.pathFromRoot
    .map(s => s.url).reduce((a, e) => a.concat(e)).map(s => s.path);
    this.router.navigate(routerLink);
  }

  async follow(follower: any){
    try {
      let data = {
        userId: this._userService.user.id,
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