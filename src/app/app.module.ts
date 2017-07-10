import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//router
import { appRouterModule } from "./app.routing";

//services
import { AuthenticationService, UserService } from './_services/index';

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
    BirthdayComponent
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
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
