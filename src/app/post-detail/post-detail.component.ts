import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { AuthService } from 'src/app/services/auth.service';
import { map, switchMap, take } from 'rxjs/operators';
import { UserprofileComponent } from '../userprofile/userprofile.component';
import { Post } from '../Models/Post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {

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
  currentPost: Post;
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
    private _authService: AuthService ) 
  {}

  ngOnInit() {
    if(this.postDetailActive){
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    }
    this.getPost();
    this.route.parent.parent.url.subscribe( (path) => this.urlUsername = path[path.length - 1].path );
  }
  getPost(){
    // this.route.parent.url.pipe(take(1), switchMap( (urlPath)=> {
    //   this.parentPath = urlPath[urlPath.length - 1].path;
    //   return this.route.params;
    // } )).pipe(
    //   switchMap( (params: Params ) => {
    //     this.currentPostId = params['id'];
    //     this.currentPostIndex = +params['ids'];
    //     if(this.parentPath === "myposts"){
    //       return this._postService.getThisUsersPosts(this._authService.authState.uid);
    //     }
    //     if(this.parentPath === "mysaved"){
    //       return this._postService.getThisUsersSavedPosts(this._authService.authState.uid);
    //     }
    //     if(this.parentPath === "mytagged"){
    //       return this._postService.getThisUsersTaggedPosts(this._authService.authState.uid);
    //     }
    //     if(this.parentPath === "posts"){
    //       return this._postService.getThisUsersPosts(UserprofileComponent.thisUserUID);
    //     }
    //     if(this.parentPath === "tagged"){
    //       return this._postService.getThisUsersTaggedPosts(UserprofileComponent.thisUserUID);
    //     }
    //   }
    // )).subscribe(
    //   (data: InstaPost[]) => {
    //         let unsortedPosts = data.filter(
    //           (posts) => {
    //             if(this.parentPath === "mysaved") return posts.postID !== "saved";
    //             if(this.parentPath === "mytagged") return posts.postID !== "tagged";
    //             if(this.parentPath === "myposts") return !posts.postID.startsWith('defaultpost-');
    //             if(this.parentPath === "posts") return !posts.postID.startsWith('defaultpost-');
    //             if(this.parentPath === "tagged") return posts.postID !== "tagged";
    //           }
    //         );
    //         this.posts = unsortedPosts.sort(function(a, b){
    //           var keyA = new Date(a.createdAt.toDate()),
    //               keyB = new Date(b.createdAt.toDate());
    //           // Compare the 2 dates
    //           if(keyA < keyB) return -1;
    //           if(keyA > keyB) return 1;
    //           return 0;
    //       }).reverse();
    //         this.currentPost = this.posts.find(
    //           (item) => {
    //             this._postService.doLikedStatus(item.postID).subscribe(
    //               (status) => {
    //                 if( typeof status === 'undefined'){
    //                   item.liked = false;
    //                 }
    //                 else{
    //                   item.liked = true;
    //                 }
    //               }
    //             );
    //             return item.postID == this.currentPostId;
    //           }
    //         );
    //         if((this.parentPath === "mysaved") && typeof this.currentPost !== 'undefined'){
    //           this._postService.getThisPost(this.currentPost.postID)
    //           .then(
    //             (data) => {
    //               console.log("post sync");
    //               console.log(this.currentPost);
    //               this.currentPost.likes = data.data().likes
    //             }
    //           )
    //           .catch(
    //             (err) => {
    //               console.log(err);
    //             }
    //           )
    //         }
    //         this.loading = false;
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
    let routerLink = this.route.parent.snapshot.pathFromRoot
    .map(s => s.url).reduce((a, e) => a.concat(e)).map(s => s.path);
    this.router.navigate(routerLink);
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

  deletePost(currentPostID: string){
    // if(confirm('Are you sure?')){
    //   this.submitted = true;
    //   this._postService.deletePost(currentPostID).then(
    //     (res) => {
    //       console.log("Deleted");
    //       this.submitted = false;
    //       this.closePostDetail();
    //     },
    //     (err) => {
    //       this.submitted = false;
    //       console.log("Error. Try Again");
    //     }
    //   );
    // }else{
    //   console.log("Delete Cancelled")
    // }

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
    //     this.closePostDetail();
    //   }
    // ).catch(
    //   (err) => {
    //     console.log("Cannot delete saved post! "+ err);
    //   }
    // );
  }

}
