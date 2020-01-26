import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/Models/Post';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  loading:boolean = true;
  explorePosts = [];
  page: number = 1;

  constructor(private _postsService:PostsService, public _userService: UserService) {
    
  }

  async getInit(){
    if(!this._userService.user) await this._userService.getCurrentUser();
    this._postsService.getExplorePosts(this._userService.user.id, this.page)
    .then( (posts: Post[]) => {
      this.explorePosts = posts;
      this.loading = false;
    } )
    .catch( error => console.log(error) )
  }

  ngOnInit() {
    this.getInit();
  }

  async loadInfinitePosts(){
    this.page = this.page + 1;
    let posts = await this._postsService.getPosts(this._userService.user.id, this.page);
    this.explorePosts = [...this.explorePosts, ...posts];
  }

}
