import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//router
import { appRouterModule } from "./app.routing";

//services
import { AuthenticationService, UserService, CommonService, FileUploadService } from './_services/index';

//guards
import { AuthGuard } from './_guards';

//components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { MainCarouselComponent } from './content/main-carousel.component';
import { MainNavigationComponent } from './content/main-navigation.component';
import { UserComponent } from './content/user/user.component';
import { ClientComponent } from './content/client/client.component';
import { FeedbackCarouselComponent } from './content/feedback-carousel.component';
import { EventComponent } from './content/event/event.component';
import { FaqComponent } from './content/faq/faq.component';
import { UserListComponent } from './content/user/user-list.component';
import { EventListComponent } from './content/event/event-list.component';
import { ClientListComponent } from './content/client/client-list.component';
import { MeetingComponent } from './content/meeting/meeting.component';
import { MeetingListComponent } from './content/meeting/meeting-list.component';
import { TelegramFeedsComponent } from './content/telegram-feeds.component';
import { BirthdayComponent } from './content/birthday.component';
import { FiComponent } from './content/fi/fi.component';
import { AwardsComponent } from './content/awards/awards.component';
import { RfpComponent } from './content/rfp/rfp.component';
import { FiListComponent } from './content/fi/fi-list.component';
import { RfpListComponent } from './content/rfp/rfp-list.component';
import { AwardsListComponent } from './content/awards/awards-list.component';
import { EventsSnapshotComponent } from './content/events-snapshot.component';
import { MeetingSnapshotComponent } from './content/meeting-snapshot.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    ContentComponent,
    MainCarouselComponent,
    MainNavigationComponent,
    UserComponent,
    ClientComponent,
    FeedbackCarouselComponent,
    EventComponent,
    FaqComponent,
    UserListComponent,
    EventListComponent,
    ClientListComponent,
    MeetingComponent,
    MeetingListComponent,
    TelegramFeedsComponent,
    BirthdayComponent,
    FiComponent,
    AwardsComponent,
    RfpComponent,
    FiListComponent,
    RfpListComponent,
    AwardsListComponent,
    EventsSnapshotComponent,
    MeetingSnapshotComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    appRouterModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    CommonService,
    UserService,
    FileUploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
