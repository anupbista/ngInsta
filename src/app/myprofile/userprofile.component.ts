import { Component, OnInit } from '@angular/core';
import { Post } from '../Models/Post';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../Models/User';
import { Observable, Subscription } from 'rxjs';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  
  constructor(private titleService: Title, private _authService: AuthService, private router: Router, public _userService: UserService, private _commonService: CommonService) { }

 setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  async getInit(){
    if(!this._userService.user) await this._userService.getCurrentUser();
    this.setTitle(this._userService.user.displayName+" (@"+this._userService.user.username+")")
  }
  
  
  ngOnInit() {
    this.getInit();
  }
  
  async logout(){
    try {
      await this._authService.doLogout(localStorage.token);
      this._commonService.userDisconnect(localStorage.userId);
      if (this._userService.userSubscription) this._userService.userSubscription.unsubscribe();
      localStorage.removeItem("token");
      localStorage.removeItem("expiresIn");
      localStorage.removeItem("userId");
      this.router.navigate(['/login']);
    } catch (error) {
     console.log(error) 
    }
  }

}
