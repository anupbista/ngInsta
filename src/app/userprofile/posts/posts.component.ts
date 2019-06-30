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
  constructor(private _postsService:PostsService,
    private _userService: UserService,
    private _authService: AuthService) { }

  
  ngOnInit() {
    this.getProfilePosts();
  }

  async getProfilePosts(){
    this.profilePosts = await this._postsService.getPostByUserId(this._userService.localUser.id, 1, false);
    this.loading = false;
    console.log(this.profilePosts)
    if(this.profilePosts.length > 0){
      this.noData = false;
    }
  }
  
}
