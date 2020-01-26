import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profilesuggestions',
  templateUrl: './profilesuggestions.component.html',
  styleUrls: ['./profilesuggestions.component.css']
})
export class ProfilesuggestionsComponent implements OnInit {

  profileSuggestionsCarouselOptions={slideBy:4, items: 4.6, dots: false, nav: true ,navText : ["",""],autoplay: false, loop: true,touchDrag: false,mouseDrag: false};

  profileUserSuggestions = [];
  folllowloading: boolean = false;

  constructor(public _userService: UserService) { }

  async getInit(){
    if(!this._userService.user) await this._userService.getCurrentUser();
    this.getUserSuggestions();
  }

  ngOnInit() {
    this.getInit();
  }

  async getUserSuggestions(){
    this.profileUserSuggestions = await this._userService.getUserSuggestions(this._userService.user.id);
    console.log(this.profileUserSuggestions)
  }

  async follow(user: any){
    this.folllowloading = true;
    try {
      let data = {
        userId: this._userService.user.id,
        aliasId: user.id
      }
      let follow = await this._userService.followUser(data);
      this.folllowloading = false;
      if(follow){
         if(user.privateProfile){
          user.status = {
            followRequested: 1
          }
         }else{
          user.status = {
            followRequested: 0
          }
         }
      }
    } catch (error) {
      console.log(error)
    }
  }

}
