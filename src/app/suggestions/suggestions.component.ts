import { Component, OnInit } from '@angular/core';
import { Post } from '../Models/Post';
import { ApiserviceService } from '../services/apiservice.service';
import { UserService } from '../services/user.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../Models/User';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {

  homeSuggestions = [];
  user;
  userSubscription: Subscription;

  constructor(private _userService: UserService, private _authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this._userService.getCurrentUser().subscribe(
      (user) => {
        this.user = user;
        this.getUserSuggestions();
          },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  async getUserSuggestions(){
    this.homeSuggestions = await this._userService.getUserSuggestions(this.user.id);
  }
}
