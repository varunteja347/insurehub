import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AboutHouseOwners } from './pages/about-house-owners/about-house-owners';
import { Domain } from './pages/domain/domain';
import { LandingComponent } from './pages/landing/landing.component';
import { AuthComponent } from './pages/auth/auth.component';
import { SurveyorHomeComponent } from './pages/surveyor-home/surveyor-home.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: Home },
  { path: 'auth', component: AuthComponent },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'user-home', component: UserHomeComponent },
  { path: 'about', component: AboutHouseOwners },
  { path: 'surveyor-home', component: SurveyorHomeComponent },
  { path: 'domain/:name', component: Domain },
  { path: '**', redirectTo: '' }
];
