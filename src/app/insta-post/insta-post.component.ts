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
export class InstaPostComponent implements OnInit, OnDestroy {

  user;

  posts = [];
  loading:boolean = true;
  isSingleClick: boolean = false;

  page: number = 1;

  userSubscription: Subscription;
  preventSimpleClick: boolean;
  timer;

  constructor(private _postsService:PostsService,
    private _authService: AuthService,
    private _userService: UserService) { }

  ngOnInit() {
    this.userSubscription = this._userService.user.subscribe(
      (user) => {
        this.user = user;
        this._postsService.getPosts(user.id, this.page)
        .then( (posts: Post[]) => {
          this.posts = posts;
          this.posts.forEach(element => {
            if(element.likes.find(o => o.userId === user.id)){
              element.liked = true;
            }else{
              element.liked = false;
            }
          });
          this.loading = false;
        } )
        .catch( error => console.log(error) )
          },
      (error) => {
        console.log(error);
      }
    );

    

  // this._postsService.getFollowingUsers()
  // .then(
  //   (res) => {
  //     res.forEach( (documentSnapshot) => {
  //       let followingUID = documentSnapshot.data();
  //       this._postsService.getThisUsersPosts(followingUID.followingUID).subscribe(
  //         (post:InstaPost[]) => {
  //           this.loading = false;
  //           let posts:InstaPost[] = post.filter(
  //             (post: InstaPost) => {
  //               return !post.postID.startsWith('defaultpost-'); 
  //             }
  //           );
  //           let unsortedposts = this.posts.concat(posts);
            
  //            this.posts = unsortedposts.sort(function(a, b){
  //             var keyA = new Date(a.createdAt.toDate()),
  //                 keyB = new Date(b.createdAt.toDate());
  //             // Compare the 2 dates
  //             if(keyA < keyB) return -1;
  //             if(keyA > keyB) return 1;
  //             return 0;
  //         }).reverse();
  //           this.posts.forEach( (post) => {
  //             this._postsService.doSavedStatus(post.postID).subscribe(
  //               (status) => {
  //                 if( typeof status === 'undefined'){
  //                   post.saved = false;
  //                 }
  //                 else{
  //                   post.saved = true;
  //                 }
  //               }
  //             );
  //             this._postsService.doLikedStatus(post.postID).subscribe(
  //               (status) => {
  //                 if( typeof status === 'undefined'){
  //                   post.liked = false;
  //                 }
  //                 else{
  //                   post.liked = true;
  //                 }
  //               }
  //             );
  //           } )
  //         }
  //       )
  //     } );
  //   }
  // )
  
  // .catch(
  //   () => {
  //     console.log("failed")
          
  //   }
  // )
  }
  
  async loadInfinitePosts(){
    this.page = this.page + 1;
    let posts = await this._postsService.getPosts(this.user.id, this.page);
    this.posts = [...this.posts, ...posts];
    console.log(this.posts)
  }

  ngOnDestroy(){
    console.log("post component Desrroyed");
    this.userSubscription.unsubscribe();
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
          userId: this.user.id,
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
      userId: this.user.id,
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

  savePost(post: Post){
  //   this._postsService.doSavePost({
  //     authorUID : post.authorUID,
  //     location : post.location,
  //     createdAt : post.createdAt,
  //     likes : post.likes,
  //     postCaption : post.postCaption,
  //     src : post.src,
  //   }, post.postID).then(
  //     () => {
  //       post.saved = true;
  //       console.log("Post saved");
  //     }
  //   ).catch(
  //     (err) => {
  //       console.log("Cannot save post! "+ err);
  //     }
  //   );
  // }

  // deleteSavePost(post: InstaPost){
  //   this._postsService.doDeleteSavePost(post.postID).then(
  //     () => {
  //       post.saved = false;
  //       console.log("Saved Post deleted");
  //     }
  //   ).catch(
  //     (err) => {
  //       console.log("Cannot delete saved post! "+ err);
  //     }
  //   );
  }

}
