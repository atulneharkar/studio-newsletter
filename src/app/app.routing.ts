import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./content/home";
import { LoginComponent } from "./login";
import {
  ForgotPasswordComponent,
  ResetPasswordComponent
} from "./forgot-password";
import { UserComponent, UserListComponent } from "./content/user";
import { EventComponent, EventListComponent } from "./content/event";
import { MeetingComponent, MeetingListComponent } from "./content/meeting";
import {
  InternalProjectComponent,
  InternalProjectListComponent
} from "./content/internal-project";

import { AuthGuard } from "./_guards/index";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
    //canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: UserComponent
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent
  },
  {
    path: "reset-password/:otp/:userId",
    component: ResetPasswordComponent
  },
  {
    path: "users/edit/:id",
    component: UserComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: "users",
    component: UserListComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: "events",
    component: EventListComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: "events/create",
    component: EventComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: "events/edit/:id",
    component: EventComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: "meeting",
    component: MeetingListComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "meeting/create",
    component: MeetingComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "meeting/edit/:id",
    component: MeetingComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "internal-project",
    component: InternalProjectListComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "internal-project/create",
    component: InternalProjectComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "internal-project/edit/:id",
    component: InternalProjectComponent,
    //canActivate: [AuthGuard]
  },

  // otherwise redirect to content
  {
    path: "**",
    redirectTo: ""
  }
];

export const appRouterModule = RouterModule.forRoot(routes);
