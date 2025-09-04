import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { ShowServicesPackagesComponent } from './layout/show-services-packages/show-services-packages.component';
import { SuccessComponent } from './layout/response/success/success.component';
import { FailedComponent } from './layout/response/failed/failed.component';
import { ErrorComponent } from './layout/response/error/error.component';
import { MySubscriptionsComponent } from './layout/my-subscriptions/my-subscriptions.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, 
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'services',component:ShowServicesPackagesComponent},
    {path:'success',component:SuccessComponent},
    {path:'fail',component:FailedComponent},
    {path:'error',component:ErrorComponent},
    {path:'my-subscriptions',component:MySubscriptionsComponent},
];