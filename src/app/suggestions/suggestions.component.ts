import { Component, OnInit } from '@angular/core';
import { Post } from '../Models/Post';
import { ApiserviceService } from '../services/apiservice.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
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

  constructor(private _userService: UserService, private _authService: AuthService) { }

  ngOnInit() {
    // this._userService.getSuggestedUser().subscribe(users => {
    //   this.homeSuggestions = users.filter(
    //     (user) => {
    //       return user.uid !== this._authService.authState.uid
    //     }
    //   );
    // });
  }
}
