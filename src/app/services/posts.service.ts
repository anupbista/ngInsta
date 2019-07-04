import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { take, map, finalize, flatMap, switchMap } from 'rxjs/operators';

import { Post } from 'src/app/Models/Post';
import { User } from '../Models/User';
import { ApiserviceService } from './apiservice.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postImageApi: string;

  constructor(private _apiService: ApiserviceService) {
    this.postImageApi = environment.postImageApi;
  }

   async getPosts(userId, page): Promise<any>{
    return await this._apiService.ngInstaGet("posts/timeline/"+userId+"/page/"+page, localStorage.token)
   }

   async addNewPost(post): Promise<any>{
    return await this._apiService.ngInstaPost(post, "posts", localStorage.token);
   }

   async addPostImage(formData, postId): Promise<any>{
    return await this._apiService.ngInstaPostImage(formData, "posts/postimage/"+postId, localStorage.token);
   }

   async deletePost(postId):Promise<any>{
      return await this._apiService.ngInstaDelete("posts/"+postId, localStorage.token);
   }

   async getPostByUserId(userId, page, profile):Promise<any>{
    return await this._apiService.ngInstaGet("posts/"+userId+"/page/"+page+"?profile="+profile, localStorage.token);
  }

  async getPostByPostId(postId):Promise<any>{
    return await this._apiService.ngInstaGet("posts/"+postId, localStorage.token);
  }

  async likePost(data){
    return await this._apiService.ngInstaPost(data, "posts/likes", localStorage.token);
  }

  async unLikePost(data): Promise<any>{
    return await this._apiService.ngInstaPost(data, "posts/unlike", localStorage.token);
  }

  async postComment(data): Promise<any>{
    return await this._apiService.ngInstaPost(data, "posts/comments", localStorage.token);
  }

  async getLikesByPostId(postId, userId):Promise<any>{
    return await this._apiService.ngInstaGet("posts/"+postId+"/likes/"+userId, localStorage.token);
  }

  async getExplorePosts(userId, page){
    return await this._apiService.ngInstaGet("posts/explore/"+userId+"/"+page, localStorage.token);
  }

  async getSavedPostByUserId(userId, page){
    return await this._apiService.ngInstaGet("posts/saved/"+userId+"/"+page, localStorage.token);
  }

  async savePost(data): Promise<any>{
    return await this._apiService.ngInstaPost(data, "posts/saved", localStorage.token);
  }

  async unSavePost(data): Promise<any>{
    return await this._apiService.ngInstaPost(data, "posts/unsave", localStorage.token);
  }

}