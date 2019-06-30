import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { Post } from '../Models/Post';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  homeStories: Post[] = [];
  constructor(private apiService:ApiserviceService) { }

  ngOnInit() {
    // this.apiService.getPosts().subscribe(
    //   (data:Post[]) => {
    //     this.homeStories = data;
    //   }
    // );
  }

}
