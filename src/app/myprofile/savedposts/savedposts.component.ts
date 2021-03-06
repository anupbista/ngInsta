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
  page: number = 1;

  constructor(private _postsService:PostsService, public _userService: UserService, private route: ActivatedRoute) { }
  
  async getInit(){
    if(!this._userService.user) await this._userService.getCurrentUser();
    this.getSavedPosts();
  }

  ngOnInit() {
    this.getInit();
  }

  async getSavedPosts(){
    this.profilesavedPosts = await this._postsService.getSavedPostByUserId(this._userService.user.id,1);
    if(this.profilesavedPosts.length > 0){this.noData = false;}
    this.loading = false;
  }

  async loadInfinitePosts(){
    this.loading = true;
    this.page = this.page + 1;
    let profilesavedPosts = await this._postsService.getSavedPostByUserId(this._userService.user.id, this.page);
    this.loading = false;
    this.profilesavedPosts = [...this.profilesavedPosts, ...profilesavedPosts];
  }

}
