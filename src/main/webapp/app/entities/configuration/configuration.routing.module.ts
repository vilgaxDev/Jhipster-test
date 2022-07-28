import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';

import { ZonalComponent } from 'app/entities/configuration/zonal.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Configuration'
        },
        children: [
            {
                path: 'zonal',
                component: ZonalComponent,
                resolve: {
                    pagingParams: JhiResolvePagingParams
                },
                data: {
                    defaultSort: 'id,asc',
                    pageTitle: 'projectGhApp.zonal.home.title'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfigurationRoutingModule {}
