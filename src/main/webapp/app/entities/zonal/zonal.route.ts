import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Zonal } from 'app/shared/model/zonal.model';
import { ZonalService } from './zonal.service';
import { ZonalComponent } from './zonal.component';
import { ZonalDetailComponent } from './zonal-detail.component';
import { ZonalUpdateComponent } from './zonal-update.component';
import { ZonalDeletePopupComponent } from './zonal-delete-dialog.component';
import { IZonal } from 'app/shared/model/zonal.model';

@Injectable({ providedIn: 'root' })
export class ZonalResolve implements Resolve<IZonal> {
    constructor(private service: ZonalService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((zonal: HttpResponse<Zonal>) => zonal.body));
        }
        return of(new Zonal());
    }
}

export const zonalRoute: Routes = [
    {
        path: 'zonal',
        component: ZonalComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'projectGhApp.zonal.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'zonal/:id/view',
        component: ZonalDetailComponent,
        resolve: {
            zonal: ZonalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectGhApp.zonal.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'zonal/new',
        component: ZonalUpdateComponent,
        resolve: {
            zonal: ZonalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectGhApp.zonal.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'zonal/:id/edit',
        component: ZonalUpdateComponent,
        resolve: {
            zonal: ZonalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectGhApp.zonal.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const zonalPopupRoute: Routes = [
    {
        path: 'zonal/:id/delete',
        component: ZonalDeletePopupComponent,
        resolve: {
            zonal: ZonalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectGhApp.zonal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
