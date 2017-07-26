import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content';
import { LoginComponent } from './login';
import { UserComponent, UserListComponent } from './content/user';
import { EventComponent, EventListComponent } from './content/event';
import { ClientComponent, ClientListComponent } from './content/client';
import { AwardsComponent, AwardsListComponent } from './content/awards';
import { MeetingComponent, MeetingListComponent } from './content/meeting';
import { FiComponent, FiListComponent } from './content/fi';
import { RfpComponent, RfpListComponent } from './content/rfp';
import { FaqComponent } from './content/faq';

import { AuthGuard } from './_guards/index';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: UserComponent
  },
  {
    path: 'edit/:id',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clients',
    component: ClientListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'events',
    component: EventListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'awards',
    component: AwardsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'meeting',
    component: MeetingListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fi',
    component: FiListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rfp',
    component: RfpListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'faq',
    component: FaqComponent,
    canActivate: [AuthGuard]
  },

  // otherwise redirect to content
  {
    path: '**',
    redirectTo: ''
  }
];

export const appRouterModule = RouterModule.forRoot(routes);