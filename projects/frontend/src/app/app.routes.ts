import { Routes } from '@angular/router';
import { authUserGuard, inverseAuthUserGuard } from './guards/auth-user.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent:() => import('./client/home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: 'iniciosesion',
        loadComponent:() => import('./client/login/login.component').then((m) => m.LoginComponent),
        canActivate: [inverseAuthUserGuard]
    },
    {
        path: 'registro',
        loadComponent:() => import('./client/register/register.component').then((m) => m.RegisterComponent),
    },
    {
        path: 'dashboard',
        loadComponent:() => import('./dashboard/home/home.component').then((m) => m.HomeComponent),
        canActivate: [authUserGuard]
    }
];
