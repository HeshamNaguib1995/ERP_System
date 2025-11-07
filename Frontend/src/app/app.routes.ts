import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login';
import { EmployeeComponent } from './Components/employee-component/employee-component';
import { SignUp } from './Components/sign-up/sign-up';
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'Employees',
        pathMatch: 'full'
    },
    {
        path: 'Login',
        component: LoginComponent
    },
    {
        path: 'SignUp',
        component: SignUp
    },
    {
        path: 'Employees',
        component: EmployeeComponent
    }

];
