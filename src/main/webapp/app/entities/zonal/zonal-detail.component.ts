import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IZonal } from 'app/shared/model/zonal.model';

@Component({
    selector: 'jhi-zonal-detail',
    templateUrl: './zonal-detail.component.html'
})
export class ZonalDetailComponent implements OnInit {
    zonal: IZonal;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ zonal }) => {
            this.zonal = zonal;
        });
    }

    previousState() {
        window.history.back();
    }
}
