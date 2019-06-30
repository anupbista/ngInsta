import { Component, OnInit, NgZone,ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../Models/User';
import { FormControl } from '@angular/forms';
import { switchMap, debounceTime, distinctUntilChanged, mergeMap, flatMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isShrunk: boolean = false;
  animatePlaceholder: boolean = false;
  @ViewChild('headersearch') headersearch: ElementRef;
  user: User;
  notis: any[] = [];
  searchloading: boolean = false;
  searchResults: User[] = [];
  usersearch: FormControl = new FormControl();
  searchInputText: "Search";
  showResults: boolean = false;

  showNotis: boolean = true;
  showFollowReq: boolean = false;

  followRequests: [];
  noFollowRequests: string = '0';
  otherNotis: [];
  notiLoading:boolean = false;
  showNotiDot: boolean = false;
  setSeen: boolean = false;
  userSubscription: Subscription;

  constructor(zone: NgZone, private _userService: UserService, private _authService: AuthService) {
    window.onscroll = () => {
      zone.run(() => {
        if(window.pageYOffset > 100) {
             this.isShrunk = true;
        } else {
             this.isShrunk = false;
        }
      });
    }
  }
  ngOnInit() {
    this.userSubscription = this._userService.user.subscribe(
      (user) => {
        this.user = user;
        // console.log(this.user)
      }
    );
    this.usersearch.valueChanges
    .pipe(debounceTime(200))
    .pipe(distinctUntilChanged())
    .pipe(flatMap( (query) => {
      this.searchloading = true;
      this.showResults= true;
      this.searchResults= [];
      return this._userService.searchUser(query)
    }))
    .subscribe(
      (response: any) => {
        // console.log(response);
        this.searchloading = false;
        if(response.length == 0){
          this.showResults= true;
          // console.log("No resultfound.")
        }else{
          this.showResults= true;
          this.searchResults = response;
        }
      })

    //   this.notiLoading = true;
    //   // get follow req notifications
    //   this._userService.getFollowReqNotifications(this._authService.authState.uid).subscribe(
    //     userNoti => {
    //       console.log(userNoti);
    //       this.notiLoading = false;
    //       if(userNoti.length > 10){
    //         this.noFollowRequests = '10+';
    //       }else{
    //         this.noFollowRequests = userNoti.length;
    //       }
    //       let f = userNoti.filter(
    //         (otherNoti) => {
    //           if(otherNoti.seen === false){
    //             this.showNotiDot = true;
    //           }
    //           return otherNoti.type !== 'default'
    //         }
    //       );
    //       this.followRequests = f;
    //     }
    //   )
    
    //   this._userService.getOtherNotis(this._authService.authState.uid).subscribe(
    //   (otherNotis) => {
    //     console.log(otherNotis);
    //     this.notiLoading = false;
    //     let f = otherNotis.filter(
    //       (otherNoti) => {
    //         if(otherNoti.seen === false){
    //           this.showNotiDot = true;
    //         }
    //         return otherNoti.type !== 'default'
    //       }
    //     );
    //     this.otherNotis = f;
    //   });

      
  }


  loadNotis(){
  //   this.setSeen = true;
  //   this.notiLoading = true;
  // // get follow req notifications
  // this._userService.getFollowReqNotifications(this._authService.authState.uid).subscribe(
  //   userNoti => {
  //     console.log(userNoti);
  //     this.notiLoading = false;
  //     if(userNoti.length > 10){
  //       this.noFollowRequests = '10+';
  //     }else{
  //       this.noFollowRequests = userNoti.length;
  //     }
  //     let f = userNoti.filter(
  //       (otherNoti) => {
  //         if(otherNoti.seen === false){
  //           this.showNotiDot = true;
  //         }
  //         if(this.setSeen === true){
  //           otherNoti.seen = true;
  //           this._userService.setNotiSeen(otherNoti.notiID)
  //           .then( () => {})
  //           .catch( (err) => console.log(err))
  //         }
  //         return otherNoti.type !== 'default'
  //       }
  //     );
  //     this.followRequests = f;
  //   }
  // )

  // this._userService.getOtherNotis(this._authService.authState.uid).subscribe(
  // (otherNotis) => {
  //   this.notiLoading = false;
  //   let f = otherNotis.filter(
  //     (otherNoti) => {
  //       if(otherNoti.seen === false){
  //         this.showNotiDot = true;
  //       }
  //       if(this.setSeen === true){
  //       otherNoti.seen = true;
  //       this._userService.setNotiSeen(otherNoti.notiID)
  //       .then( () => {})
  //       .catch( (err) => console.log(err))
  //       return otherNoti.type !== 'default'
  //     }
  //   }
  //   );
  //   this.otherNotis = f ;
  //   console.log(this.otherNotis)
  // });
  }

  dosetSeen(){
    setTimeout( () => {
      this.setSeen = false;
      this.showNotiDot = false;
    }, 5000)
  }
  
  toAnimatePlaceholder(){
    this.headersearch.nativeElement.placeholder= "Search";
    this.animatePlaceholder = true;
  }
  noAnimatePlaceholder(){
    this.headersearch.nativeElement.placeholder= "";
    this.headersearch.nativeElement.blur();
    this.animatePlaceholder = false;
    if(this.usersearch.value == ""){
      this.showResults= false;
      this.searchResults= [];
    }
  }

  showFollowRequets($event){
    $event.preventDefault();
    $event.stopPropagation();
    this.showNotis = false;
    this.showFollowReq = true;
  }

  doshowNotis($event){
    $event.preventDefault();
    $event.stopPropagation();
    this.showNotis = true;
    this.showFollowReq = false;
  }

  approveFollowReq($event, notiID: string, uid: string){
    // $event.stopPropagation();
    // this._userService.doFollowFromReq(uid).then(
    //   () => {
    //     console.log("user followed accepted");
    //     this._userService.removeThisNoti(notiID, this._authService.authState.uid).then(
    //       () => {
    //         console.log("noti removed");
    //       }
    //     ).catch(
    //       (err) => {
    //         console.log(err)
    //       }
    //     )
    //     this._userService.removeRequestFollowByOwner(this._authService.authState.uid, uid).then(
    //       () => {
    //         console.log("follow req removed");
    //         this._userService.createNotifications(this._authService.authState.uid, uid).then(
    //           () => {
    //             console.log("noti send");
    //           }
    //         ).catch(
    //           (err) => {
    //             console.log(err)
    //           }
    //         )
    //       }
    //     ).catch(
    //       (err) => {
    //         console.log(err)
    //       }
    //     )
    //   }
    // ).catch(
    //   (err) => {
    //     console.log(err)
    //   }
    // )
  }

  hideFollowReq($event, notiID: string, uid: string){
    // $event.stopPropagation();
    // this._userService.removeThisNoti(notiID, this._authService.authState.uid).then(
    //   () => {
    //     console.log("noti removed");
    //   }
    // ).catch(
    //   (err) => {
    //     console.log(err)
    //   }
    // )
    // this._userService.removeRequestFollowByOwner(this._authService.authState.uid, uid).then(
    //   () => {
    //     console.log("follow req removed");
    //   }
    // ).catch(
    //   (err) => {
    //     console.log(err)
    //   }
    // )
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  
}
