import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {LayoutComponent} from './pages/layout/layout.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {NewParkingComponent} from './pages/new-parking/new-parking.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'newParking',
        component: NewParkingComponent
      }
    ]
  }
];
