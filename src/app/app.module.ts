import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
// import { AngularStickyThingsModule } from '@w11k/angular-sticky-things';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ContentLoaderModule } from '@netbasal/ngx-content-loader';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StoriesComponent } from './stories/stories.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { InstaPostComponent } from './insta-post/insta-post.component';
import { ApiserviceService } from './services/apiservice.service';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { HomeComponent } from './home/home.component';
import { ProfilesuggestionsComponent } from './profilesuggestions/profilesuggestions.component';
import { OwlModule } from 'ngx-owl-carousel';
import { TaggedComponent } from './userprofile/tagged/tagged.component';
import { PostsComponent } from './userprofile/posts/posts.component';
import { LoginComponent } from './login/login.component';
import { MySavedpostsComponent } from './myprofile/savedposts/savedposts.component';
import { MyTaggedComponent } from './myprofile/tagged/tagged.component';
import { MyPostsComponent } from './myprofile/posts/posts.component';
import { MyprofileComponent } from './myprofile/userprofile.component';
import { InstaLoadingComponent } from './insta-loading/insta-loading.component';
import { AccountComponent } from './account/account.component';
import { EditComponent } from './account/edit/edit.component';
import { PasswordchangeComponent } from './account/passwordchange/passwordchange.component';
import { ManageaccessComponent } from './account/manageaccess/manageaccess.component';
import { EmailsmsComponent } from './account/emailsms/emailsms.component';
import { ContactsComponent } from './account/contacts/contacts.component';
import { PrivacysecurityComponent } from './account/privacysecurity/privacysecurity.component';
import { ExploreComponent } from './explore/explore.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { SignupComponent } from './signup/signup.component';
import { FollowersComponent } from './components/followers/followers.component';
import { FollowingComponent } from './components/following/following.component';
import { environment } from 'src/environments/environment';
import { NewpostComponent } from './newpost/newpost.component';
import { PostsService } from './services/posts.service';
import { NotverifiedComponent } from './components/notverified/notverified.component';
import { AuthenticateGuard } from './services/authenticate.guard';
import { QRCodeModule } from 'angularx-qrcode';
import { MomentPipe } from './pipes/moment.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LikedbyComponent } from './components/likedby/likedby.component';
import { ExploredetailComponent } from './components/exploredetail/exploredetail.component';
import { LikesComponent } from './components/likes/likes.component';
import { SinglepostdetailComponent } from './singlepostdetail/singlepostdetail.component';
import { HTTPInterceptor } from './services/httpInterceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NotificationService } from './services/notification.service';
import { MessageService } from './services/message.service';
import { MessagesComponent } from './messages/messages.component';
import { UserService } from './services/user.service';
import { CommonService } from './services/common.service';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StoriesComponent,
    SuggestionsComponent,
    InstaPostComponent,
    UserprofileComponent,
    HomeComponent,
    ProfilesuggestionsComponent,
    TaggedComponent,
    PostsComponent,
    LoginComponent,
    MySavedpostsComponent,
    MyTaggedComponent,
    MyPostsComponent,
    MyprofileComponent,
    InstaLoadingComponent,
    AccountComponent,
    EditComponent,
    PasswordchangeComponent,
    ManageaccessComponent,
    EmailsmsComponent,
    ContactsComponent,
    PrivacysecurityComponent,
    ExploreComponent,
    PostDetailComponent,
    SignupComponent,
    FollowersComponent,
    FollowingComponent,
    NewpostComponent,
    NotverifiedComponent,
    MomentPipe,
    LikedbyComponent,
    ExploredetailComponent,
    LikesComponent,
    SinglepostdetailComponent,
    LoaderComponent,
    MessagesComponent,
    FilterPipe 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // AngularStickyThingsModule,
    OwlModule,
    ContentLoaderModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    QRCodeModule,
    ScrollingModule,
    PickerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HTTPInterceptor,
    multi: true
  }, ApiserviceService, AuthService, AuthGuard, PostsService, AuthenticateGuard, LoaderService, NotificationService, MessageService, UserService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
