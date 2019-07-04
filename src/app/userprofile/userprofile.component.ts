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
  user: User;
  userProfile: any;
  userId: string;
  userSubsciption: Subscription;
  username: string;
  folllowloading: boolean = false;

  constructor(private titleService: Title, 
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService,
    private _authService: AuthService) { }

  setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
  
  ngOnInit() {
    this.userSubsciption = this._userService.getCurrentUser().pipe(flatMap( user => {
      this.user = user;
      return this.route.url;
    })).subscribe(
      async (urlPath: UrlSegment[]) => {
        try {
          this.username = urlPath[urlPath.length - 1].path;
          this.userProfile = await this._userService.getUserByUsername(this.username);
          this._userService.localUser = this.userProfile;
          this.setTitle(this.userProfile.displayName+" (@"+this.userProfile.username+")");
          this.userId = this.userProfile.id;
          if(this.userId === this.user.id){
            this.router.navigate(['myprofile', this.user.username]);
          }
          this.getUserProfile();
        } catch (error) {
          console.log(error)
        }
      }
    );
  }

  async getUserProfile(){
    this.userProfile.status = await this._userService.getUserProfile(this.userId, this.user.id);
    console.log(this.userProfile)
  }

  ngOnDestroy(): void {
    this.userSubsciption.unsubscribe();
  }


  toggleSuggestions(){
    this.showProfileSuggestions = !this.showProfileSuggestions;
  }

  async follow(user: any){
    this.folllowloading = true;
    try {
      let data = {
        userId: this.user.id,
        aliasId: user.id
      }
      let follow = await this._userService.followUser(data);
      this.folllowloading = false;
      if(follow){
         if(user.privateProfile){
          user.status = {
            followRequested: 1
          }
         }else{
          user.status = {
            followRequested: 0
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
        userId: this.user.id,
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
