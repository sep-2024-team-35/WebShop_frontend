import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { HomeComponent } from './layout/home/home.component';
import { ShowServicesPackagesComponent } from './servicesAndPackages/show-services-packages/show-services-packages.component';
import { SuccessComponent } from './layout/response/success/success.component';
import { FailedComponent } from './layout/response/failed/failed.component';
import { ErrorComponent } from './layout/response/error/error.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, 
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'home',component:HomeComponent},
    {path:'services',component:ShowServicesPackagesComponent},
    {path:'success',component:SuccessComponent},
    {path:'fail',component:FailedComponent},
    {path:'error',component:ErrorComponent}
];