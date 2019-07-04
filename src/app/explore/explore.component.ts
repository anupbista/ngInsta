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
export class ExploreComponent implements OnInit, OnDestroy {

  loading:boolean = true;
  explorePosts = [];
  page: number = 1;
  user;
  userSubscription: Subscription;

  constructor(private _postsService:PostsService, private _userService: UserService) {
    
  }

  ngOnInit() {

    this.userSubscription = this._userService.getCurrentUser().subscribe(
      (user) => {
        this.user = user;
        this._postsService.getExplorePosts(user.id, this.page)
        .then( (posts: Post[]) => {
          this.explorePosts = posts;
          this.loading = false;
        } )
        .catch( error => console.log(error) )
          },
      (error) => {
        console.log(error);
      }
    );

  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  async loadInfinitePosts(){
    this.page = this.page + 1;
    let posts = await this._postsService.getPosts(this.user.id, this.page);
    this.explorePosts = [...this.explorePosts, ...posts];
  }

}
