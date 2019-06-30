import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/Models/Post';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { UserprofileComponent } from '../userprofile.component';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tagged',
  templateUrl: './tagged.component.html',
  styleUrls: ['./tagged.component.css']
})
export class TaggedComponent implements OnInit {

  profileTaggedPosts: Post[] = [];
  loading:boolean= true;
  noData: boolean = true;
  constructor(private _postsService: PostsService) { }
  
  ngOnInit() {
    // this._postsService.getThisUsersTaggedPosts(UserprofileComponent.thisUserUID).subscribe(
    //   (posts) => {
    //     this.profileTaggedPosts = posts.filter(
    //       (posts) => {
    //         posts.postID !== "tagged";
    //       }
    //     );
    //     if(this.profileTaggedPosts.length > 0){this.noData = false;}
    //     this.loading = false;
    //     console.log(this.profileTaggedPosts);
    //   }
    // );
  }

}
