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

  constructor(public _userService: UserService, private _authService: AuthService) { }

  async getInit(){
    if(!this._userService.user) await this._userService.getCurrentUser();
    this.getUserSuggestions();
  }

  ngOnInit() {
    this.getInit();
  }

  async getUserSuggestions(){
    this.homeSuggestions = await this._userService.getUserSuggestions(this._userService.user.id);
  }
}
