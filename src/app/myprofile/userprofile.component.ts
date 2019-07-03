import { Component, OnInit } from '@angular/core';
import { Post } from '../Models/Post';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../Models/User';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-myprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  user: User;
  userSubsciption: Subscription
  
  constructor(private titleService: Title, private _authService: AuthService, private router: Router, private _userService: UserService) { }

 setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
  
  
  ngOnInit() {
    this.userSubsciption= this._userService.user.subscribe(
      (user) => {
        this.user = user;
        // console.log(this.user)
        this.setTitle(this.user.displayName+" (@"+this.user.username+")")
        },
      (error) => {
        console.log(error);
      }
    );
  }
  
  async logout(){
    try {
      await this._authService.doLogout(localStorage.token);
      localStorage.removeItem("token");
      localStorage.removeItem("expiresIn");
      localStorage.removeItem("userId");
      this.router.navigate(['/login']);
    } catch (error) {
     console.log(error) 
    }
  }

  ngOnDestroy(): void {
    this.userSubsciption.unsubscribe();
  }

}
