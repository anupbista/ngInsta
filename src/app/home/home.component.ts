import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../Models/User';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  readonly VAPID_PUBLIC_KEY = "BJaIbjgsGhRN6PBiQpe2hqiOJAmb5v7EHO7lzzbwslwBXegkc9_nf643-0a8UYzeDX1EYa0T0xxfX_Ev19xEQv8";

  user: User = null;
  date = new Date();

  constructor(private titleService: Title, private authService: AuthService, public _userService: UserService, private swPush: SwPush,private _notificationService: NotificationService, private router: Router) {
   }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
    this.setTitle("Instagram");
    // if (this.swPush.isEnabled) {
        //     if(!this.swPush.subscription){
        //       // request user to enable notifications
        //       this.swPush.requestSubscription({
        //         serverPublicKey: this.VAPID_PUBLIC_KEY
        //       })
        //       .then(sub => this._notificationService.addPushSubscriber(this.user.id, sub).subscribe( ))
        //       .catch(err => console.error("Could not subscribe to notifications", err));
        //     }
        //     // handle click action
        //     this.swPush.notificationClicks.subscribe((result) => {
        //         if(result.action === "notification"){
        //           window.open(result.notification.data.url, "_blank");
        //         }
        //     })
        // }
  }

}
