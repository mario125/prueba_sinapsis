import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './guards/auth.guard';

import { CustomerCrudComponent } from './admin/customer-crud/customer-crud.component';
import { UserCrudComponent } from './admin/user-crud/user-crud.component';

import { MessagesCrudComponent } from './admin/messages-crud/messages-crud.component';
import { CampaignCrudComponent } from './admin/campaigns-crud/campaigns-crud.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'customer', component: CustomerCrudComponent },
      { path: 'user', component: UserCrudComponent },
      { path: 'campaigns', component: CampaignCrudComponent },
      { path: 'messages', component: MessagesCrudComponent },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
