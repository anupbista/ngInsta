import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { AuthService } from '../services/auth.service';
import { Post } from 'src/app/Models/Post';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit, OnDestroy {

  loading:boolean = true;
  explorePosts: Post[] = [];

  constructor(private _postService:PostsService, private _authService: AuthService) {
    
  }

  ngOnDestroy(){
    console.log(" explore Desrroyed");
  }

  ngOnInit() {
    // this._postService.getExplorePosts().subscribe(
    //   (data:InstaPost[]) => {
    //     this.loading = false;
    //     console.log(data)
    //     this.explorePosts = data.filter( post => !post.postID.startsWith('defaultpost-') && post.authorUID !== this._authService.authState.uid && !post.user.privateProfile === true);
    //   }
    // );
  }
}
