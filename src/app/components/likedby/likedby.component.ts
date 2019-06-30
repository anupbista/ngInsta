import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { take, map, finalize, flatMap, switchMap, mergeMap } from 'rxjs/operators';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-likedby',
  templateUrl: './likedby.component.html',
  styleUrls: ['./likedby.component.css']
})
export class LikedbyComponent implements OnInit {

  postID: string ="";
  followers: User[] = [];
  followerLoading: boolean = true;
  folllowloading: boolean = false;
  folllowReq: boolean = false;

  constructor(private route: ActivatedRoute,
     private _userService: UserService,
     private router: Router,
     private _authService: AuthService,
     private _postService: PostsService) { }

  ngOnInit() {
    // this.route.parent.url.pipe(
    //   mergeMap(
    //     (urlPath: UrlSegment[]) => {
    //       this.postID = urlPath[1].path;
    //       console.log(this.postID)
    //       return this._postService.getThisPostLikes(this.postID);
    //     }
    //   )).subscribe(
    //   (user) => {
    //     user.map(
    //       (us) => {
    //         this.followerLoading = false;
    //         if(us.user.uid === this._authService.authState.uid){
    //           us.mineuid = true;
    //         }else{
    //           this._userService.doFolllowStatus(us.user.uid).subscribe(
    //             (status) => {
    //               if( typeof status === 'undefined'){
    //                 us.follow = false;
    //                 us.mineuid = false;
    //               }
    //               else{
    //                 us.follow = true;
    //                 us.mineuid = false;
    //               }
    //             }
    //           )
    //         }
    //         if(this.followers.length !== 0){
    //           this.followers.forEach( follower => {
    //             if( (follower.uid !== us.user.uid) && (us.user.uid !== "wzdk1nz25hT3OlvWew7k16gtzgM2")){
    //               this.followers.push(us)
    //             }
    //           } )
    //         }
    //         else{
    //           if( (us.user.uid !== "wzdk1nz25hT3OlvWew7k16gtzgM2")){
    //             this.followers.push(us)
    //           }
    //         }
    //       }
    //     )
    //     console.log(this.followers);
    //   }
    // )

  }

  closePostDetail(){
    let routerLink = this.route.parent.snapshot.pathFromRoot
    .map(s => s.url).reduce((a, e) => a.concat(e)).map(s => s.path);
    this.router.navigate(routerLink);
  }

  follow(follower){
    // this.folllowloading = true;
    // if(follower.user.privateProfile){
    //   this._userService.requestFollow(this._authService.authState.uid, follower.user.uid)
    //   .then(
    //     () => {
    //       this.folllowloading = false;
    //       this.folllowReq = true;
    //     }
    //   )
    //   .catch(
    //     (err) => {
    //       console.log(err);
    //       this.folllowloading = false;
    //       follower.user.follow = false;
    //     }
    //   )
    // }
    // else{
    //   this._userService.doFollow(follower.user.uid).then(
    //     () => {
    //       follower.user.follow = true;
    //        this.folllowloading = false;
    //        console.log("Followed " + follower.user.uid);
    //     }
    //   ).catch(
    //    (err) => {
    //      this.folllowloading = false;
    //      follower.user.follow  = false;
    //      console.log("Failed to follow" + follower.user.uid +" =>"+ err);
    //    } 
    //   );
    // }
  }

}
