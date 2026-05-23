import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Profile } from './pages/profile/profile';
import { BrokersExchanges } from './pages/brokers-exchanges/brokers-exchanges';
import { Subscriptions } from './pages/subscriptions/subscriptions';
import { UsersComponent } from './pages/users/users';
import {Admindashboard} from  './pages/admindashboard/admindashboard';

 

export const routes: Routes = [
  { path: '', component: Login},
  { path:'login', component: Login},
  { path:'dashboard', component: Dashboard},
  { path:'profile', component: Profile},
  { path:'brokers-exchanges', component: BrokersExchanges},
  { path:'subscriptions', component:Subscriptions},
  { path: 'users', component: UsersComponent },
  {path:'adminboard',component:Admindashboard}
];