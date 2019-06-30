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

   getExplorePosts(){
    //  const random = this.db.createId();
    // this.posts = this.db.collection<Post>('posts', ref => ref.where('authorUID','<',random).limit(50)).snapshotChanges().pipe(map(actions => {
    //   return actions.map(action => {
    //     const data = action.payload.doc.data() as InstaPost;
    //     const postID = action.payload.doc.id;
    //     return this.userCollection.doc(data.authorUID).snapshotChanges().pipe(take(1), map(
    //       (actions) => {
    //         return actions.payload.data();
    //       }
    //     ),map( (user: User) => {
    //       return {...data, postID, user };
    //     } ));
    //   });
    // })).pipe(flatMap( ps => combineLatest(ps) ));
    //  return this.posts;
   }

   getFollowingUsers(){
    //  return this.userCollection.doc(this._authService.authState.uid).collection('following').get().toPromise();
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


   getThisPost(postID: string){
    // return this.db.collection('posts').doc(postID).get().toPromise();
   }

   getThisOPost(postID: string){
    // return this.db.collection('posts').doc(postID).snapshotChanges().pipe(
    //  map(action => {
    //     const data = action.payload.data() as InstaPost;
    //     const postID = action.payload.id
    //     return this.userCollection.doc(data.authorUID).snapshotChanges().pipe(take(1), map(
    //       (actions) => {
    //         return actions.payload.data();
    //       }
    //     ),map( (user: User) => {
    //       return {...data, postID, user };
    //     } ));
    //   }
    //   )).pipe(flatMap( ps => combineLatest(ps) ));
   }

   getThisPostLikes(postID: string){
    // return this.postCollection.doc(postID).collection('likedby').snapshotChanges().pipe(map( actions => {
    //   return actions.map(a => {
    //     const data = a.payload.doc.data();
    //     const postID = a.payload.doc.id;
    //     return this.userCollection.doc(data.likedby).snapshotChanges().pipe(take(1), map(
    //       (actions) => {
    //         return actions.payload.data();
    //       }
    //     ),map( (user: User) => {
    //       return {...data, postID, user };
    //     } ));
    //   })
    // })).pipe(flatMap( ps => combineLatest(ps) ));
   }

   getThisUsersPosts(uid: string){
    // return this.db.collection<Post>('posts', ref => ref.where('authorUID', '==', uid )).snapshotChanges().pipe(take(1), map( actions => {
    //   return actions.map(a => {
    //     const data = a.payload.doc.data() as InstaPost;
    //     const postID = a.payload.doc.id;
    //     return this.userCollection.doc(data.authorUID).snapshotChanges().pipe(take(1), map(
    //       (actions) => {
    //         return actions.payload.data();
    //       }
    //     ),map( (user: User) => {
    //       return {...data, postID, user };
    //     } ));
    //   })
    // })).pipe(flatMap( ps => combineLatest(ps) ));
  }

  getThisUsersSavedPosts(uid: string){
    // return this.db.collection<User>('users').doc(uid).collection('savedposts').snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as InstaPost;
    //     const postID = a.payload.doc.id;
    //     return this.userCollection.doc(data.authorUID).snapshotChanges().pipe(take(1), map(
    //       (actions) => {
    //         return actions.payload.data();
    //       }
    //     ),map( (user: User) => {
    //       return {...data, postID, user };
    //     } ));
    //   })
    //   )).pipe(flatMap( ps => combineLatest(ps) ));
  }

  getThisUsersTaggedPosts(uid: string){
    // return this.db.collection<User>('users').doc(uid).collection('taggedposts').snapshotChanges().pipe(
    //   map(actions => {
    //     return actions.map(a => {
    //     const data = a.payload.doc.data() as InstaPost;
    //     const postID = a.payload.doc.id;
        
    //     return this.userCollection.doc(data.authorUID).snapshotChanges().pipe(take(1), map(
    //       (actions) => {
    //         return actions.payload.data();
    //       }
    //     ),map( (user: User) => {
    //       return {...data, postID, user };
    //     } ));
    //   })
    // })).pipe(flatMap( ps => combineLatest(ps) ));
  }

  doSavePost(post: Post, postID: string){
    // return new Promise( (resolve, reject) => {
    //   this.db.collection('users').doc(this._authService.authState.uid).collection('savedposts').doc(postID).set(post)
    //   .then(
    //     () => {
    //       resolve();
    //     },
    //     (err) => {
    //       reject(err);
    //     }
    //   );
    //  } );
  }

  doDeleteSavePost(postID: string){
    // return new Promise( (resolve, reject) => {
    //   this.db.collection('users').doc(this._authService.authState.uid).collection('savedposts').doc(postID).delete()
    //   .then(
    //     () => {
    //       resolve();
    //     },
    //     (err) => {
    //       reject(err);
    //     }
    //   );
    //  } );
  }

  doSavedStatus(postID:string){
    // return this.db.collection('users').doc(this._authService.authState.uid).collection('savedposts').doc(postID).valueChanges();
  }
  doLikedStatus(postID:string){
    // return this.db.collection('posts').doc(postID).collection('likedby').doc(this._authService.authState.uid).valueChanges();
  }

  async likePost(data){
    return await this._apiService.ngInstaPost(data, "posts/likes", localStorage.token);
  }

  async unLikePost(data): Promise<any>{
    return await this._apiService.ngInstaPost(data, "posts/unlike", localStorage.token);
  }

}