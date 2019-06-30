import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { Post } from '../Models/Post';
import { AuthService } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../Models/User';
import { UserService } from '../services/user.service';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {
  newPostForm: FormGroup;
  submitted: Boolean = false;
  removeAlert: Boolean = false;
  url: any;
  file: File;
  user: User;

  userSubscription: Subscription;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  
  constructor(private _location: Location, 
    private formBuilder: FormBuilder,
    private _postsService: PostsService,
    private _authService: AuthService,
    private _userService: UserService,
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,) { }

  ngOnInit() {
    this.userSubscription = this._userService.user.subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.log(error);
      }
    );

    this.newPostForm = this.formBuilder.group({
      postLocation: ['', Validators.maxLength(20)],
      postImage: ['', Validators.required],
      postCaption: ['', Validators.maxLength(50)]
    });

    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          async (position) => {
              // this.geolocationPosition = position,
                  console.log(position);
                  // const location = await this._userService.getLocation('https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyB4G9Cko5NxGfaCa3i3l2lvRvBPa9KA2fA');
                  // console.log(location)
          },
          error => {
              switch (error.code) {
                  case 1:
                      console.log('Permission Denied');
                      break;
                  case 2:
                      console.log('Position Unavailable');
                      break;
                  case 3:
                      console.log('Timeout');
                      break;
              }
          }
      );
  };

  // autocomplete
  this.mapsAPILoader.load().then(() => {
    // this.setCurrentLocation();
    // this.geoCoder = new google.maps.Geocoder;

    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      types: ["address"]
    });
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
        console.log(place)
      });
    });
  });

  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  get f(){
    return this.newPostForm.controls;
  }

  dismissNewPost(){
    this._location.back();
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      // this.newPostForm.get('postImage').setValue(file);
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  async onSubmit(){
    // let postId = null;
    // try {
    //   this.submitted = true;
    //   if(this.newPostForm.invalid){
    //     this.removeAlert = false;
    //     setTimeout(()=> {
    //       this.removeAlert = true;
    //     }, 4000);
    //     return;
    //   }
    //   const postData = {
    //     latitude: this.f.postLocation.value,
    //     longitute: this.f.postLocation.value,
    //     caption: this.f.postCaption.value,
    //     userId: this.user.id,
    //     postImage: ""
    //   }
    //   postId = await this._postsService.addNewPost(postData);
    //   let formData = new FormData();
    //   formData.append('postImage', this.file);
    //   // console.log(formData)
    //   // formData.forEach(
    //   //   (val ,key) => console.log(val) 
    //   // )
    //   if(postId){
    //     await this._postsService.addPostImage(formData, postId);
    //   }
    //   this._location.back();
    // } catch (error) {
    //   console.log(error);
    //   if(postId){
    //     // delete the post
    //     await this._postsService.deletePost(postId);
    //     this._location.back();
    //   }
    // }
    
  }

}