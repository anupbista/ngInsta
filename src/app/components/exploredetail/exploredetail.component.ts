import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { AuthService } from 'src/app/services/auth.service';
import { map, switchMap, take } from 'rxjs/operators';
import { UserprofileComponent } from '../../userprofile/userprofile.component';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-exploredetail',
  templateUrl: './exploredetail.component.html',
  styleUrls: ['./exploredetail.component.css']
})
export class ExploredetailComponent implements OnInit {

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closePostDetail();
  }

  postDetailActive: boolean = true;
  currentPostId: string;
  currentPost;
  loading:boolean = true;
  folllowloading: boolean = false;
  folllowReq: boolean = false;

  constructor(private _location: Location, 
    private route: ActivatedRoute, 
    private router: Router, 
    private _postService: PostsService,
    private _authService: AuthService,
    private _userService: UserService ) 
  {}

  ngOnInit() {
    if(this.postDetailActive){
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    }
    this.getPost();
  }
  getPost(){
    // this.route.params.pipe(switchMap((params:Params) => {
    //   this.currentPostId = params['id'];
    //   return this._postService.getThisOPost(this.currentPostId)
    // })).subscribe(
    //   (post) => {
    //     this.loading = false;
    //     this.currentPost = post[0];
    //     this._postService.doSavedStatus(this.currentPost.postID).subscribe(
    //       (status) => {
    //         if( typeof status === 'undefined'){
    //           this.currentPost.saved = false;
    //         }
    //         else{
    //           this.currentPost.saved = true;
    //         }
    //       }
    //     );
    //     this._postService.doLikedStatus(this.currentPost.postID).subscribe(
    //       (status) => {
    //         if( typeof status === 'undefined'){
    //           this.currentPost.liked = false;
    //         }
    //         else{
    //           this.currentPost.liked = true;
    //         }
    //       }
    //     );
    //     console.log(this.currentPost);
    //   }
    // )
  }

  ngOnDestroy(): void {
  //   if(this.postDetailActive){
  //     document.getElementsByTagName("body")[0].style.overflow = "auto";
  //   }
  }

  closePostDetail(){
    // let routerLink = this.route.parent.snapshot.pathFromRoot
    // .map(s => s.url).reduce((a, e) => a.concat(e)).map(s => s.path);
    // this.router.navigate(routerLink);
  }

  likePost(post): void{
  // if(!post.liked){
  //   this._postService.likePost(post.postID)
  //   .then(
  //     () => {
  //       post.liked = true;
  //       post.likes++;
  //       console.log("Post Liked");
  //     }
  //   )
  //   .catch(
  //     (err) => {
  //       post.liked = false;
  //       console.log("Unable to like" +err);
  //     }
  //   )
  // }
    
  }

  unLikePost(post){
  //  unlike post
  // this._postService.unLikePost(post.postID)
  // .then(
  //   () => {
  //     post.liked = false;
  //     post.likes--;
  //     console.log("Post unliked");
  //   }
  // )
  // .catch(
  //   (err) => {
  //     post.liked = true;
  //     console.log("Unable to unlike" +err);
  //   }
  // )
  }

  deleteSavedPost(postID: string){
    // this._postService.doDeleteSavePost(postID).then(
    //   () => {
    //     console.log("Saved Post deleted");
    //   }
    // ).catch(
    //   (err) => {
    //     console.log("Cannot delete saved post! "+ err);
    //   }
    // );
  }

  savePost(post){
    // this._postService.doSavePost({}, post.postID).then(
    //   () => {
    //     post.saved = true;
    //     console.log("Post saved");
    //   }
    // ).catch(
    //   (err) => {
    //     console.log("Cannot save post! "+ err);
    //   }
    // );
  }


}
