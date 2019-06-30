import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { HomeComponent } from './home/home.component';
import { TaggedComponent } from './userprofile/tagged/tagged.component';
import { PostsComponent } from './userprofile/posts/posts.component';
import { LoginComponent } from './login/login.component';
import { MySavedpostsComponent } from './myprofile/savedposts/savedposts.component';
import { MyTaggedComponent } from './myprofile/tagged/tagged.component';
import { MyPostsComponent } from './myprofile/posts/posts.component';
import { MyprofileComponent } from './myprofile/userprofile.component';
import { AccountComponent } from "./account/account.component";  
import { EditComponent } from "./account/edit/edit.component";  
import { PasswordchangeComponent } from "./account/passwordchange/passwordchange.component";  
import { ManageaccessComponent } from "./account/manageaccess/manageaccess.component";  
import { EmailsmsComponent } from "./account/emailsms/emailsms.component";  
import { ContactsComponent } from "./account/contacts/contacts.component";  
import { PrivacysecurityComponent } from "./account/privacysecurity/privacysecurity.component";  
import { ExploreComponent } from "./explore/explore.component";  
import { PostDetailComponent } from "./post-detail/post-detail.component";  
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './services/auth.guard';
import { NewpostComponent } from './newpost/newpost.component';
import { NotverifiedComponent } from './components/notverified/notverified.component';
import { AuthenticateGuard } from './services/authenticate.guard';
import { FollowersComponent } from './components/followers/followers.component';
import { FollowingComponent } from './components/following/following.component';
import { LikedbyComponent } from './components/likedby/likedby.component';
import { ExploredetailComponent } from './components/exploredetail/exploredetail.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [AuthenticateGuard]},
  {path: 'notverified', component: NotverifiedComponent},
  {path: 'signup', component: SignupComponent, canActivate: [AuthenticateGuard]},
  {path: 'explore', component: ExploreComponent, canActivate: [AuthGuard], children: [
    {path: 'p/:id', component: ExploredetailComponent, children: [
      {path: 'likes', component: LikedbyComponent},
    ]}
  ]},
  {path: 'profile/:id', component: UserprofileComponent, children: [
   {path: '', redirectTo:'posts', pathMatch: 'full'},
   {path: 'followers', component: FollowersComponent },
   {path: 'following', component: FollowingComponent },
   {path: 'tagged', component: TaggedComponent},
   {path: 'posts', component: PostsComponent, children:[
    {path: 'p/:id/:ids', component: PostDetailComponent, children: [
      {path: 'likes', component: LikedbyComponent},
    ]},
   ]},
  ], canActivate: [AuthGuard]},
  {path: 'myprofile/:id', component: MyprofileComponent, children: [
    {path: '', redirectTo:'myposts', pathMatch: 'full'},
   {path: 'followers', component: FollowersComponent },
   {path: 'following', component: FollowingComponent },
    {path: 'mytagged', component: MyTaggedComponent, children: [
      {path: 'p/:id/:ids', component: PostDetailComponent, children: [
        {path: 'likes', component: LikedbyComponent},
      ]}
    ]},
    {path: 'myposts', component: MyPostsComponent, children: [
      {path: 'newpost', component: NewpostComponent},
      {path: 'p/:id/:ids', component: PostDetailComponent, children: [
        {path: 'likes', component: LikedbyComponent},
      ]}
    ]},
    {path: 'mysaved', component: MySavedpostsComponent, children: [
      {path: 'p/:id/:ids', component: PostDetailComponent, children: [
        {path: 'likes', component: LikedbyComponent},
      ]}
    ]},
   ], canActivate: [AuthGuard]},
   {path: 'accounts', component: AccountComponent, children: [
    {path: '', redirectTo:'edit', pathMatch: 'full'},
    {path: 'edit', component: EditComponent},
    {path: 'passwordchange', component: PasswordchangeComponent},
    {path: 'manage_access', component: ManageaccessComponent},
    {path: 'emailsettings', component: EmailsmsComponent},
    {path: 'contact_history', component: ContactsComponent},
    {path: 'privacy_and_security', component: PrivacysecurityComponent},
   ], canActivate: [AuthGuard]},
   { path: '**', redirectTo:'', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
