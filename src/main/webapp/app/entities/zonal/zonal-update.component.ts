import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IZonal } from 'app/shared/model/zonal.model';
import { ZonalService } from './zonal.service';

@Component({
    selector: 'jhi-zonal-update',
    templateUrl: './zonal-update.component.html'
})
export class ZonalUpdateComponent implements OnInit {
    private _zonal: IZonal;
    isSaving: boolean;
    createdAt: string;
    updatedAt: string;

    constructor(private zonalService: ZonalService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ zonal }) => {
            this.zonal = zonal;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.zonal.createdAt = moment(this.createdAt, DATE_TIME_FORMAT);
        this.zonal.updatedAt = moment(this.updatedAt, DATE_TIME_FORMAT);
        if (this.zonal.id !== undefined) {
            this.subscribeToSaveResponse(this.zonalService.update(this.zonal));
        } else {
            this.subscribeToSaveResponse(this.zonalService.create(this.zonal));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IZonal>>) {
        result.subscribe((res: HttpResponse<IZonal>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get zonal() {
        return this._zonal;
    }

    set zonal(zonal: IZonal) {
        this._zonal = zonal;
        this.createdAt = moment(zonal.createdAt).format(DATE_TIME_FORMAT);
        this.updatedAt = moment(zonal.updatedAt).format(DATE_TIME_FORMAT);
    }
}
