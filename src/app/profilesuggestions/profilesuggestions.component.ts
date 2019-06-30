import { Component, OnInit } from '@angular/core';
import { Post } from '../Models/Post';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profilesuggestions',
  templateUrl: './profilesuggestions.component.html',
  styleUrls: ['./profilesuggestions.component.css']
})
export class ProfilesuggestionsComponent implements OnInit {

  profileSuggestionsCarouselOptions={slideBy:4, items: 4.6, dots: false, nav: true ,navText : ["",""],autoplay: false, loop: true,touchDrag: false,mouseDrag: false};

  user: User[];

  constructor(private _userService: UserService) { }

  ngOnInit() {
    // this._userService.getSuggestedUser().subscribe(
    //   users => this.user = users
    // );
  }

}
