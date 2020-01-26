import { Component, OnInit } from '@angular/core';
import { Post} from 'src/app/Models/Post';
import { PostsService } from 'src/app/services/posts.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserprofileComponent } from '../userprofile.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  profilePosts: Post[] = [];
  loading:boolean= true;
  noData: boolean = true;
  page: number = 1;

  constructor(private _postsService:PostsService,
    public _userService: UserService,
    private _authService: AuthService) { }

  async getInit(){
    if(!this._userService.user) await this._userService.getCurrentUser();
    this.getProfilePosts();
  }
  
  ngOnInit() {
    this.getInit();
  }

  async getProfilePosts(){
    this.profilePosts = await this._postsService.getPostByUserId(this._userService.aliasuser.id, 1, false);
    this.loading = false;
    if(this.profilePosts.length > 0){
      this.noData = false;
    }
  }

  async loadInfinitePosts(){
    this.loading = true;
    this.page = this.page + 1;
    let profilePosts = await this._postsService.getPostByUserId(this._userService.aliasuser.id, this.page, false);
    this.loading = false;
    this.profilePosts = [...this.profilePosts, ...profilePosts];
  }
  
}
