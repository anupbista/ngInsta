import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { AuthService } from '../../services/auth.service';
import { Post } from '../../Models/Post';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-myposts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class MyPostsComponent implements OnInit {

  loading:boolean = true;
  profilePosts: Post[];
  page: number = 1;
  noData: boolean = true;
  constructor(private _postsService:PostsService, public _userService: UserService) { }

  async getInit(){
    if(!this._userService.user) await this._userService.getCurrentUser();
    this.getProfilePosts();
  }

  ngOnInit() {
    this.getInit();
  }

  async getProfilePosts(){
    this.profilePosts = await this._postsService.getPostByUserId(this._userService.user.id, 1, true);
    this.loading = false;
    if(this.profilePosts.length > 0){
      this.noData = false;
    }
  }

  async loadInfinitePosts(){
    this.loading = true;
    this.page = this.page + 1;
    let profilePosts = await this._postsService.getPostByUserId(this._userService.user.id, this.page, true);
    this.loading = false;
    this.profilePosts = [...this.profilePosts, ...profilePosts];
  }

}