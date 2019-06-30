import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  loginCarouselOptions={items: 1, dots: false, nav: false ,autoplay: true, loop: true, animateOut:'fadeOut',touchDrag: false,mouseDrag: false};
  signinError: String;
  submitted:boolean = false;

  constructor(private router:Router, private _authService: AuthService, private _userService: UserService){
    if(this._authService.isAuthenticated()){
      this.router.navigate(['']);
    }
  }
  ngOnInit() {
   
  }

  onSignUp(form: NgForm){
    this.submitted = true;
    this.signinError = "";
    this._authService.doRegister(form.value).then(res => {
      console.log(res);
      this.submitted = false;
      this._authService.setSession(res);          
      this.router.navigate(['']);
    }, err => {
      this.submitted = false;
      this.signinError = err.error.message;
      console.log(err);
    });
  }

}
