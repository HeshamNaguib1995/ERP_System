import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login';
import { EmployeeComponent } from './Components/employee-component/employee-component';
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
        path: 'Employees',
        component: EmployeeComponent
    }

];
