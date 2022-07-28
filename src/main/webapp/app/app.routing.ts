import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from 'app/containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '404',
        component: P404Component,
        data: {
            title: 'Page 404'
        }
    },
    {
        path: '500',
        component: P500Component,
        data: {
            title: 'Page 500'
        }
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Login Page'
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: {
            title: 'Register Page'
        }
    },
    {
        path: '',
        component: DefaultLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'configuration',
                loadChildren: './entities/configuration/configuration.module#ConfigurationModule'
            },
            {
                path: 'batch',
                loadChildren: './entities/batch-management/batchmgnt.module#BatchmgntModule'
            },
            {
                path: 'nurserystock',
                loadChildren: './entities/nursery-stock-management/nursery-stock.module#NurseryStockMgntModule'
            },
            {
                path: 'nursery-inventory',
                loadChildren: './entities/nursery-inventory-management/nursery-inventory.module#NurseryInventoryMgntModule'
            },
            {
                path: 'damage',
                loadChildren: './entities/damage-management/damage-management.module#DamagemgntModule'
            },
            {
                path: 'godown',
                loadChildren: './entities/godown-management/godown.module#GodownModule'
            },
            {
                path: 'dashboard',
                loadChildren: './views/dashboard/dashboard.module#DashboardModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
