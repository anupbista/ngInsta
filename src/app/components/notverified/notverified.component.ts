import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notverified',
  templateUrl: './notverified.component.html',
  styleUrls: ['./notverified.component.css']
})
export class NotverifiedComponent implements OnInit {

  emailAddress: String;

  constructor(private authService: AuthService, private router: Router) { 
  }

  ngOnInit() {
    console.log(this.authService.authState);
    if(this.authService.authState === null){
      this.router.navigate(['login']);
    }
    if(this.authService.authState){
      this.emailAddress = this.authService.authState.email;
    }
  }

  deleteAccount(){
    // console.log("Delete Account Clicked!!!");
    // this.authService.doDeleteAccount().then(() => {
    //   alert("Starting");
    //   this.router.navigate(['signup']);
    //   alert("Ending");    
    // }, err => {
    //   console.log(err);
    // });
  }

  logout(){
    // this.authService.doLogout().then(res => {
    //   console.log(res);
    //   this.router.navigate(['login']);    
    // }, err => {
    //   console.log(err);
    // });
  }

}
