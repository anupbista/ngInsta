import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/Models/Post';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mysavedposts',
  templateUrl: './savedposts.component.html',
  styleUrls: ['./savedposts.component.css']
})
export class MySavedpostsComponent implements OnInit {

  loading:boolean = true;
  profilesavedPosts: Post[] = [];
  noData: boolean = true;
  userSubsciption: Subscription;
  user;
  page: number = 1;

  constructor(private _postsService:PostsService, private _userService: UserService, private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.userSubsciption= this._userService.getCurrentUser().subscribe(
      (user) => {
        this.user = user;
        this.getSavedPosts();
        },
      (error) => {
        console.log(error);
      }
    );
  }

  async getSavedPosts(){
    this.profilesavedPosts = await this._postsService.getSavedPostByUserId(this.user.id,1);
    if(this.profilesavedPosts.length > 0){this.noData = false;}
    this.loading = false;
  }

  async loadInfinitePosts(){
    this.loading = true;
    this.page = this.page + 1;
    let profilesavedPosts = await this._postsService.getSavedPostByUserId(this.user.id, this.page);
    this.loading = false;
    this.profilesavedPosts = [...this.profilesavedPosts, ...profilesavedPosts];
  }

  ngOnDestroy(): void {
    this.userSubsciption.unsubscribe();  
  }

}
