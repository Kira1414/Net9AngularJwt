import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';

export const routes: Routes = [
    {
        title: 'Registro',
        component: RegisterComponent,
        path: 'register'
    },
    {
        title: 'Login',
        component: LoginComponent,
        path: ''
    },
    {
        title: 'Productos',
        component: ProductComponent,
        path: 'products'
    }
];
