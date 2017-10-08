import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//router
import { appRouterModule } from "./app.routing";

//services
import { 
    AuthenticationService, 
    UserService, 
    CommonService, 
    FileUploadService, 
    HelperService, 
    ProjectService, 
    EventService,
    MeetingRoomService,
    ValidationService
} from './_services/index';

//directives
import { 
    ModalComponent
} from './_directives/index';

//guards
import { AuthGuard } from './_guards';

//components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header';
import { LoginComponent } from './login';
import { FooterComponent } from './footer';
import { 
    MainCarouselComponent,
    MainNavigationComponent,
    FeedbackCarouselComponent,
    HomeComponent
} from './content/home';
import { UserComponent, UserListComponent } from './content/user';
import { ClientComponent, ClientListComponent } from './content/client';
import { EventComponent, EventListComponent } from './content/event';
import { MeetingComponent, MeetingListComponent } from './content/meeting';
import { InternalProjectComponent, InternalProjectListComponent } from './content/internal-project';
import { RecognitionComponent, RecognitionListComponent } from './content/recognition';
import { ForgotPasswordComponent, ResetPasswordComponent } from './forgot-password';
import { CalcExpPipe } from './_pipes';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    HomeComponent,
    MainCarouselComponent,
    MainNavigationComponent,
    UserComponent,
    ClientComponent,
    FeedbackCarouselComponent,
    EventComponent,
    UserListComponent,
    EventListComponent,
    ClientListComponent,
    MeetingComponent,
    MeetingListComponent,
    InternalProjectComponent,
    RecognitionComponent,
    InternalProjectListComponent,
    RecognitionListComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    ModalComponent,
    CalcExpPipe
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
    FileUploadService,
    HelperService,
    ProjectService,
    EventService,
    MeetingRoomService,
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
