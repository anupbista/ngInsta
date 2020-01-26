import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { AuthService } from 'src/app/services/auth.service';
import { map, switchMap, take } from 'rxjs/operators';
import { UserprofileComponent } from '../../userprofile/userprofile.component';
import { Post } from '../../Models/Post';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-exploredetail',
  templateUrl: './exploredetail.component.html',
  styleUrls: ['./exploredetail.component.css']
})
export class ExploredetailComponent implements OnInit {

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closePostDetail();
  }
  @HostListener('document:keydown.arrowleft', ['$event']) onKeyleftHandler(event: KeyboardEvent) {
    if(!this.firstPost){
      this.navPrevPost();
    }
  }
  @HostListener('document:keydown.arrowright', ['$event']) onKeyrightHandler(event: KeyboardEvent) {
    if(!this.lastPost){
    this.navNextPost();
    }
  }

  postDetailActive: boolean = true;
  currentPostId: string;
  currentPostIndex: number;
  currentPost: any;
  nextPost: Post;
  prevPost: Post;
  posts:Post[];
  lastPost: boolean = false;
  firstPost:boolean = false;
  loading:boolean = true;
  urlUsername: string = "";
  parentPath: string = "";
  submitted: boolean = false;

  constructor(private _location: Location, 
    private route: ActivatedRoute, 
    private router: Router, 
    private _postService: PostsService,
    public _userService: UserService ) 
  {}

  async getInit(){
    if(!this._userService.user) await this._userService.getCurrentUser();
    if(this.postDetailActive){
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    }
    this.getPost();
    this.route.parent.parent.url.subscribe( (path) => this.urlUsername = path[path.length - 1].path );
  }

  ngOnInit() {
    this.getInit();
  }

  async getPostByPostId(){
    this.currentPost = await this._postService.getPostByPostId(this.currentPostId);
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
    this.parentPath = this.router.url;
    this.currentPostId = this.route.snapshot.paramMap.get('id');
    this.currentPostIndex = +this.route.snapshot.paramMap.get('ids');
    this.getPostByPostId();
    //         this.nextPost = this.posts[this.currentPostIndex + 1];
    //         this.prevPost = this.posts[this.currentPostIndex - 1];
            
    //         if(this.nextPost === undefined){
    //           // hide the next button
    //           this.lastPost = true;
    //         }else{
    //           this.lastPost = false;
    //         }
    //         if(this.prevPost === undefined){
    //           // hide the prev button
    //           this.firstPost = true;
    //         }else{
    //           this.firstPost = false;
    //         }
    //   }
    // );
    
  }

  ngOnDestroy(): void {
    if(this.postDetailActive){
      document.getElementsByTagName("body")[0].style.overflow = "auto";
    }
  }

  closePostDetail(){
    this._location.back();
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
      form.reset();
    } catch (error) {
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


  navNextPost(){
    // if(this.parentPath === "myposts"){
    // this.router.navigate(['/myprofile/'+this.urlUsername+'/myposts/p/',this.nextPost.postID,this.currentPostIndex+1]);
    // }
    // else if(this.parentPath === "mysaved"){
    //   this.router.navigate(['/myprofile/'+this.urlUsername+'/mysaved/p/',this.nextPost.postID,this.currentPostIndex+1]);
    // }
    // else if(this.parentPath === "mytagged"){
    //   this.router.navigate(['/myprofile/'+this.urlUsername+'/mytagged/p/',this.nextPost.postID,this.currentPostIndex+1]);
    // }
    // else{
    //   this.router.navigate(['/profile/'+this.urlUsername+'/posts/p/',this.nextPost.postID,this.currentPostIndex+1]);
    // }
  }

  navPrevPost(){
    // if(this.parentPath === "myposts"){
    //   this.router.navigate(['/myprofile/'+this.urlUsername+'/myposts/p/',this.prevPost.postID,this.currentPostIndex-1]);
    // }
    // else if(this.parentPath === "mysaved"){
    //   this.router.navigate(['/myprofile/'+this.urlUsername+'/mysaved/p/',this.prevPost.postID,this.currentPostIndex-1]);
    // }
    // else if(this.parentPath === "mytagged"){
    //   this.router.navigate(['/myprofile/'+this.urlUsername+'/mytagged/p/',this.prevPost.postID,this.currentPostIndex-1]);
    // }
    // else{
    //   this.router.navigate(['/profile/'+this.urlUsername+'/posts/p/',this.prevPost.postID,this.currentPostIndex-1]);
    // }
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

}