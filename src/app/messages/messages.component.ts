import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../Models/User';
import { NgForm } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/common.service';

interface ChatUser extends User{
  messages: any;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @ViewChild('f') form: any;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  showEmojiPicker: boolean = false;
  contacts: any = [];
  activeUsers: any = [];
  contact: ChatUser;
  message: any = null;
  searchText: string = null;
  messageSubscription: Subscription;
  userStatusSubscription: Subscription;

  constructor(private _messageService: MessageService, public _userService: UserService, private _commonService: CommonService) { }

  ngOnInit() {
    this.getInit();
  }

private scrollToBottom(): void {
  try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight + 200;
  } catch(err) { }
}

  async getInit(){
    if(!this._userService.user) await this._userService.getCurrentUser();
    this.getFollowingUsers();
    this.messageSubscription = this._messageService.getMessage().subscribe( (message) =>{
      // find user in contact list
      let us__er = this.contacts,find( u => u.id == message.user.id);
      if(us__er){
        us__er.messages.push(message);
      }
      setTimeout(() => {
        this.scrollToBottom();
      }, 0);
    } )
    this.userStatusSubscription = this._messageService.getUserStatus().subscribe( (data: any) =>{
      this.activeUsers = data.map((el) => el.userId);
      this.contacts.forEach(element => {
        if(this.activeUsers.includes(element.id)){
          element.status = true;
        }else{
          element.status = false;
        }
      });
      console.log(this.activeUsers)
    } )
  }

  async getFollowingUsers(){
    this.contacts = await this._userService.getFollowing(this._userService.user.id, 1);
    this.contacts.forEach(element => {
      element.status = false
      element.messages = []
    });
    if(this.contacts.length > 0) this.contact = this.contacts[0];
    else this.contact = null;
    this._messageService.requestUserStatus(this._userService.user.id)
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe()
    this.userStatusSubscription.unsubscribe()
  }

  onSubmit(form: NgForm){
    this.showEmojiPicker = false;
    console.log(form.value.message);
    if(this.contact && form.value.message){
      this._messageService.sendMessage({sender: this._userService.user, message: form.value.message, receiver: this.contact});
    }
    form.reset();
  }

  addEmoji(event){
    if(event.emoji.native){
      if(!this.message) this.message = event.emoji.native
      else this.message += event.emoji.native
    }
  }

  openEmojiPicker(){
    this.showEmojiPicker = !this.showEmojiPicker
  }

  inputFocus(){
    this.showEmojiPicker = false;
  }

  selectContact(user){  
    this.contact = user;
  }

}
