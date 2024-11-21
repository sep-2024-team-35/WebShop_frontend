import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { HomeComponent } from './layout/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, 
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'home',component:HomeComponent}
];