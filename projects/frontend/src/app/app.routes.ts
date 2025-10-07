import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent:() => import('./client/home/home.component').then((m) => m.HomeComponent),
    },
    {
        path: 'iniciosesion',
        loadComponent:() => import('./client/login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'registro',
        loadComponent:() => import('./client/register/register.component').then((m) => m.RegisterComponent),
    }
];
