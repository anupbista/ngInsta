import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { AuthService } from '../../services/auth.service';
import { Post } from 'src/app/Models/Post';

@Component({
  selector: 'app-mysavedposts',
  templateUrl: './savedposts.component.html',
  styleUrls: ['./savedposts.component.css']
})
export class MySavedpostsComponent implements OnInit {

  loading:boolean = true;
  profilesavedPosts: Post[] = [];
  noData: boolean = true;
  constructor(private _postsService:PostsService, private _authService: AuthService) { }
  
  ngOnInit() {
    // this._postsService.getThisUsersSavedPosts(this._authService.authState.uid).subscribe(
    //   (posts) => {
    //     this.profilesavedPosts = posts.filter(
    //       (posts) => {
    //         console.log(posts);
    //         if(posts.postID !== 'saved'){
    //           this._postsService.getThisPost(posts.postID)
    //           .then(
    //             (data) => {
    //               console.log("post sync");
    //               posts.likes = data.data().likes
    //             }
    //           )
    //           .catch(
    //             (err) => {
    //               console.log(err);
    //             }
    //           )
    //         }
    //         return posts.postID !== "saved";
    //       }
    //     );
    //     if(this.profilesavedPosts.length > 0){this.noData = false;}
    //     this.loading = false;
    //     console.log(this.profilesavedPosts);
    //   }
    // );
  }

}
