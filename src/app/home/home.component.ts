import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../Models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User = null;
  date = new Date();

  constructor(private titleService: Title, private authService: AuthService, private _userService: UserService) {
    
   }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
    this.setTitle("Instagram");
    this._userService.user.subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
