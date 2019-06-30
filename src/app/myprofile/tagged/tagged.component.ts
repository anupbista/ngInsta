import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/Models/Post';
import { PostsService } from 'src/app/services/posts.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mytagged',
  templateUrl: './tagged.component.html',
  styleUrls: ['./tagged.component.css']
})
export class MyTaggedComponent implements OnInit {
  loading:boolean = true;
  profileTaggedPosts: Post[] = [];
  noData: boolean = true;
  constructor(private _postsService:PostsService, private _authService: AuthService) { }

  
  ngOnInit() {
    // this._postsService.getThisUsersTaggedPosts(this._authService.authState.uid).subscribe(
    //   (posts) => {
        
    //     this.profileTaggedPosts = posts.filter(
    //       (posts) => {
    //         posts.postID !== "tagged";
    //       }
    //     );
    //     if(this.profileTaggedPosts.length > 0){this.noData = false;}
    //     this.loading = false;
    //     console.log(this.profileTaggedPosts);
    //   }
    // );
  }

}