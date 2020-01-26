import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { CommonService } from './services/common.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngInsta';

  constructor(private _commonService: CommonService, public _userService: UserService, private _authService: AuthService){
    this._commonService.setSocketConnection();
    if(!this._userService.user && this._authService.isAuthenticated()) this._userService.getCurrentUser();
  }

  ngOnDestroy(): void {
  }

}
