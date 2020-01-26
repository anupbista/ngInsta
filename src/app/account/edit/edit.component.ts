import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/Models/User';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, 
    private _authService: AuthService, 
    public _userService: UserService,
    private toast: ToastrService) { }

  message: String= "";
  editForm: FormGroup;
  submitted: Boolean = false;
  progress: boolean = false;

  user: User;

  genders = [
    {name: 'Male', value: 'Male'},
    {name: 'Female', value: 'Female'},
    {name: 'Not Specified', value: null},
  ];

  async getInit(){
    if(!this._userService.user) await this._userService.getCurrentUser();
    await this.getUserDetails();
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      displayName: ['', [Validators.required,Validators.maxLength(20)]],
      username: ['', Validators.required],
      website: [],
      bio: [],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [],
      gender: ['Not Specified'],
      privateProfile: [false,Validators.required]
    });
    this.editForm.controls.gender.setValue("Not Specified");
    this.getInit();
  }

  async getUserDetails(){
    this.user = await this._userService.getUser(this._userService.user.id);
    console.log(this.user);
    this.editForm.patchValue(this.user);
  }

  get f(){
    return this.editForm.controls;
  }

  async onSubmit(){
    if(this.editForm.valid){
      try {
        console.log("Edit Form Submitted");
        this.submitted = true;
        console.log(this.editForm.value);
        await this._userService.updateUser(this.user.id, this.editForm.value);
        this.toast.show('Profile saved.');
        this.submitted = false;
      } catch (error) {
        console.log(error)
        this.toast.show('Failed to update profile. Try again.');     
        this.submitted = false;   
      }
    }

  }

  async changeProfilePicture(event: any){
    try {
      const file: File = event.target.files[0];
      let formData = new FormData();
      formData.append('profileImage', file);
      this.progress = true;
      await this._userService.updateUserImage(this.user.id, formData)
      this.toast.show('Profile image saved.');
      this.user = await this._userService.getUser(this.user.id);
      // this.editForm.setValue({ csc : this.user.userImage});
      this.progress = false;
    } catch (error) {
      this.toast.show('Failed to update profile image. Try again.');
      this.progress = false;
      console.error(error);
    }
    }

}
