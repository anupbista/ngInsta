import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../Models/Post';
import { PostsService } from '../services/posts.service';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-insta-post',
  templateUrl: './insta-post.component.html',
  styleUrls: ['./insta-post.component.css']
})
export class InstaPostComponent implements OnInit {

  user;

  posts = [];
  loading:boolean = true;
  isSingleClick: boolean = false;

  page: number = 1;

  preventSimpleClick: boolean;
  timer;

  constructor(private _postsService:PostsService,
    private _authService: AuthService,
    public _userService: UserService) { }

  async getInit(){
    if(!this._userService.user) await this._userService.getCurrentUser();
    this._postsService.getPosts(this._userService.user.id, this.page)
        .then( (posts: Post[]) => {
          this.posts = posts;
          if(this.posts.length > 0){
            this.posts.forEach(element => {
              if(element.likes.find(o => o.userId === this._userService.user.id)){
                element.liked = true;
              }else{
                element.liked = false;
              }
              if(element.saveposts.find(o => o.userId === this._userService.user.id)){
                element.saved = true;
              }else{
                element.saved = false;
              }
            });
            this.loading = false;
          }
          else{
            this.loading = false;
          }
        } )
        .catch( error => console.log(error) )
  }

  ngOnInit() {
    this.getInit();
  }
  
  async loadInfinitePosts(){
    this.loading = true;
    this.page = this.page + 1;
    let posts = await this._postsService.getPosts(this._userService.user.id, this.page);
    if(this.posts.length > 0){
      this.posts.forEach(element => {
        if(element.likes.find(o => o.userId === this._userService.user.id)){
          element.liked = true;
        }else{
          element.liked = false;
        }
        if(element.saveposts.find(o => o.userId === this._userService.user.id)){
          element.saved = true;
        }else{
          element.saved = false;
        }
      });
      this.loading = false;
    }
    else{
      this.loading = false;
    }
    this.posts = [...this.posts, ...posts];
  }

  simpleClickFunction(): void{
    this.timer = 0;
    this.preventSimpleClick = false;
    let delay = 500;

    this.timer = setTimeout(() => {
      if(!this.preventSimpleClick){
        //whatever you want with simple click go here
        console.log("simple click");
      }
    }, delay);

  }

  async likePost(post){
    try {
      this.preventSimpleClick = true;
      clearTimeout(this.timer);
      if(!post.liked){
        await this._postsService.likePost({
          userId: this._userService.user.id,
          postId: post.id
        });
        post.liked = true;
        post.likesNo++;
        console.log("Post Liked");
      }
    } catch (error) {
      post.liked = false;
      console.log(error);
    }
  }

 async unLikePost(post){
  try {
    await this._postsService.unLikePost({
      userId: this._userService.user.id,
      postId: post.id
    });
    post.liked = false;
    post.likesNo--;
    console.log("Post unliked");
  } catch (error) {
    post.liked = true;
    console.log(error);
  }
  }

  async savePost(post){
    try {
      await this._postsService.savePost({
        userId : this._userService.user.id,
        postId : post.id,
      });
      post.saved = true;
    } catch (error) {
      post.saved = false;
      console.log(error)      
    }
  }

  async deleteSavePost(post){
    try {
      await this._postsService.unSavePost({
        userId : this._userService.user.id,
        postId : post.id,
      });
      post.saved = false;
    } catch (error) {
      post.saved = true;
      console.log(error);
    }
  }

}
