import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];
import { DefaultLayoutComponent } from 'app/containers';
import { P404Component } from 'app/views/error/404.component';
import { P500Component } from 'app/views/error/500.component';
import { LoginComponent } from 'app/views/login/login.component';
import { RegisterComponent } from 'app/views/register/register.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                // ...LAYOUT_ROUTES,
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#ProjectGhAdminModule'
                },
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
                            path: 'dashboard',
                            loadChildren: './views/dashboard/dashboard.module#DashboardModule'
                        }
                    ]
                },
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
export class ProjectGhAppRoutingModule {}
