import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { switchMap } from 'rxjs/operators';
import { Post } from '../Models/Post';
import { UserService } from '../services/user.service';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-singlepostdetail',
  templateUrl: './singlepostdetail.component.html',
  styleUrls: ['./singlepostdetail.component.css']
})
export class SinglepostdetailComponent implements OnInit {

  postDetailActive: boolean = true;
  currentPostId: string;
  currentPost: any;

  posts:Post[];
  loading:boolean = true;
  submitted: boolean = false;

  constructor(private _location: Location, 
    private route: ActivatedRoute, 
    private router: Router, 
    private _postService: PostsService,
    public _userService: UserService ) 
  {}

  async getInit(){
    if(!this._userService.user) await this._userService.getCurrentUser();
    this.getPost();
  }

  ngOnInit() {
    fromEvent(window, 'popstate')
  .subscribe((e) => {
    console.log(e, 'back button');
    this.router.navigate([''])
  });
  
    // if(this.postDetailActive){
    //   document.getElementsByTagName("body")[0].style.overflow = "hidden";
    // }
   this.getInit();
  }

  async getPostByPostId(){
    this.currentPost = await this._postService.getPostByPostId(this.currentPostId);
    console.log(this.currentPost);
    if(this.currentPost.likes.find(o => o.userId === this._userService.user.id)){
      this.currentPost.liked = true;
    }else{
      this.currentPost.liked = false;
    }
    if(this.currentPost.saveposts.find(o => o.userId === this._userService.user.id)){
      this.currentPost.saved = true;
    }else{
      this.currentPost.saved = false;
    }
    this.loading = false;
  }

  getPost(){
    this.currentPostId = this.route.snapshot.paramMap.get('id');
    this.getPostByPostId();
  }

  ngOnDestroy(): void {
    if(this.postDetailActive){
      document.getElementsByTagName("body")[0].style.overflow = "auto";
    }
  }

  closePostDetail(){
    let routerLink:any = this.route.parent.snapshot.pathFromRoot
    .map(s => s.url).reduce((a, e) => a.concat(e)).map(s => s.path);
    this.router.navigate([routerLink[0]+"/"+routerLink[1]+"/"+routerLink[2]]);
  }

  async postComment(form){
    let pushComment = {
      commentText: form.value.commentText,
      user: this._userService.user,
      createdAt: new Date()
    }
    this.currentPost.comments.push(pushComment);
    try {
      let data = {
        commentText: form.value.commentText,
        userId: this._userService.user.id,
        postId: this.currentPost.id
      };
      await this._postService.postComment(data);
    } catch (error) {
      console.log(error);
    }
  }

  async likePost(post){
    try {
      if(!post.liked){
        await this._postService.likePost({
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
    await this._postService.unLikePost({
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
      await this._postService.savePost({
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
      await this._postService.unSavePost({
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
