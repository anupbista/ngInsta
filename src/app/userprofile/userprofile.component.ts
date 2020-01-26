import { Component, OnInit } from '@angular/core';
import { Post } from '../Models/Post';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, UrlSegment, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../Models/User';
import { take, switchMap, flatMap, map} from "rxjs/operators";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  showProfileSuggestions:boolean = false;
  userProfile: any;
  userId: string;
  username: string;
  folllowloading: boolean = false;

  constructor(private titleService: Title, 
    private route: ActivatedRoute,
    private router: Router,
    public _userService: UserService,
    private _authService: AuthService) { }

  setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  async getInit(){
    if(!this._userService.user) await this._userService.getCurrentUser();
    try {
      this.username = this.router.url.split('/')[2];
      this.userProfile = await this._userService.getUserByUsername(this.username);
      this._userService.aliasuser = this.userProfile;
      this.setTitle(this.userProfile.displayName+" (@"+this.userProfile.username+")");
      this.userId = this.userProfile.id;
      if(this.userId === this._userService.user.id){
        this.router.navigate(['myprofile', this._userService.user.username]);
      }
      this.getUserProfile();
    } catch (error) {
      console.log(error)
    }
  }
  
  ngOnInit() {
    this.getInit();
  }

  async getUserProfile(){
    this.userProfile.status = await this._userService.getUserProfile(this.userId, this._userService.user.id);
    console.log(this.userProfile)
  }

  toggleSuggestions(){
    this.showProfileSuggestions = !this.showProfileSuggestions;
  }

  async follow(user: any){
    this.folllowloading = true;
    try {
      let data = {
        userId: this._userService.user.id,
        aliasId: user.id
      }
      let follow = await this._userService.followUser(data);
      this.folllowloading = false;
      if(follow){
         if(user.privateProfile){
          user.status = {
            followRequested: true
          }
         }else{
          user.status = {
            followRequested: false
          }
         }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async unFollow(follower: any){
    try {
      let data = {
        userId: this._userService.user.id,
        aliasId: follower.id
      }
      let follow = await this._userService.unFolllowUser(data);
      if(follow){
        follower.status = null
      }
      this.showProfileSuggestions = false;
    } catch (error) {
      console.log(error)
    }
  }

}
