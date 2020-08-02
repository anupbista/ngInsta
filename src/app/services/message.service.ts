import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _authService: AuthService, private _commonService: CommonService) {
  }

  public sendMessage(message){
    if(this._commonService.socket) this._commonService.socket.emit('new-message', message);
  }

  public getMessage(){
    return Observable.create( (observer) => {
      this._commonService.socket.on('new-message', (message) => {
        observer.next(message);
      })
    } )
  }

}
