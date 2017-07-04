import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content';
import { LoginComponent } from './login';
import { UserComponent, UserListComponent } from './content/user';
import { EventComponent, EventListComponent } from './content/event';
import { ClientComponent, ClientListComponent } from './content/client';
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
    component: UserComponent,
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clients',
    component: ClientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'events',
    component: EventComponent,
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