import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCarouselOptions={items: 1, dots: false, nav: false ,autoplay: true, loop: true, animateOut:'fadeOut',touchDrag: false,mouseDrag: false};
  error: any;
  loginError: String;
  submitted: boolean;
  
  constructor(private router:Router, private _authService: AuthService, private _commonService: CommonService, public _userService: UserService){
    if(this._authService.isAuthenticated()){
      this.router.navigate(['']);
    }
  }
  
  ngOnInit() {
      
  }

  onLogin(value: NgForm){
    this.submitted = true;
    this.loginError = "";
    this._authService.doLogin(value)
    .then(async (res) => {
      this.submitted = false;
      await this._authService.setSession(res);
      this._userService.getCurrentUser();
      // emit event of user-connect
      this._commonService.userConnect(res.userId);
      this.router.navigate(['']);
    }, err => {
      this.submitted = false;
      this.loginError= err.error;
      console.log(err);
    })
  }
  
}
