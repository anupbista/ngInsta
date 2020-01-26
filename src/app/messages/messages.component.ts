import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../Models/User';
import { NgForm } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @ViewChild('f') form: any;
  
  contacts: any = [];
  messages: any[] = [];
  contact: User;
  message: any = null;

  constructor(private _messageService: MessageService, public _userService: UserService, private _commonService: CommonService) { }

  ngOnInit() {
    this.getInit();
  }

  async getInit(){
    if(!this._userService.user) await this._userService.getCurrentUser();
    this.getFollowingUsers();
    this._messageService.getMessage().subscribe( (message: string) =>{
      this.messages.push(message);
    } )

  }

  async getFollowingUsers(){
    this.contacts = await this._userService.getFollowing(this._userService.user.id, 1);
    if(this.contacts.length > 0) this.contact = this.contacts[0];
    else this.contact = null;
  }

  onSubmit(form: NgForm){
    console.log(form.value.message);
    if(this.contact){
      this._messageService.sendMessage({sender: this._userService.user, message: form.value.message, receiver: this.contact});
    }
    form.reset();
  }

  selectContact(user){  
    this.contact = user;
  }

  ngAfterViewInit() {         
    let container = document.getElementById("messageContainer");    
    container.scrollTop = container.scrollHeight; 
  } 

}
