import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public socket;

  constructor(private _authService: AuthService) {
  }

  setSocketConnection(){
    if(this._authService.isAuthenticated()){
      if(!this.socket) this.socket = io(environment.api, {
        transports: ['websocket'], 
        upgrade: false
      });
      this.userConnect(localStorage.userId);
    }
  }

  userConnect(userId){
    if(!this.socket) this.socket = io(environment.api);
    console.log("user-connect " + userId)
    this.socket.emit('user-connect', userId);
  }

  userDisconnect(userId){
    this.socket.emit('user-disconnect', userId);
  }

  scroll(el: any) {
    el.scrollIntoView();
}

}
