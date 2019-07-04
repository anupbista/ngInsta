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

  user;
  profileUserSuggestions = [];
  userSubscription: Subscription;
  folllowloading: boolean = false;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.userSubscription = this._userService.user.subscribe(
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
    this.profileUserSuggestions = await this._userService.getUserSuggestions(this.user.id);
    console.log(this.profileUserSuggestions)
  }

  async follow(user: any){
    this.folllowloading = true;
    try {
      let data = {
        userId: this.user.id,
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
