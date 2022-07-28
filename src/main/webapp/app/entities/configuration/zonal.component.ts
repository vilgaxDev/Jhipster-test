// Import needed component and dependency
import { Component, OnInit } from '@angular/core';
import { ZonalService } from 'app/entities/service/zonal.service';
import { IZonal, ZonalModel } from 'app/shared/model/zonal.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ViewChild } from '@angular/core';

import { JhiParseLinks } from 'ng-jhipster';

import * as moment from 'moment';
import { DATE_TIME_FORMAT, ITEMS_PER_PAGE, Filter} from 'app/shared';
import { HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Display the alert message of success and error
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

// Mension the html, css/sass files
@Component({
    selector: 'jhi-zonal',
    templateUrl: 'zonal.component.html'
})

/**
 * Class ZonalComponent used to create/update a zonal, List all zonals.
 * Declared an Zonal object to create and update.
 * Declared an Array variable to set list of zonals.
 * Using a modal popup directive create and update form is displayed.
 */
export class ZonalComponent implements OnInit {
    // Create object for model
    zonalObject: ZonalModel = new ZonalModel();

    // create empty array for each service
    zonals: IZonal[];
    createdAt: string;
    updatedAt: string;
    batchId: number;

    // Title and alertTitle declation as String
    title: String;
    alertTitle: String;

    // To display the success message
    private success = new Subject<string>();
    successMessage: string;

    // To display the error message
    private error = new Subject<string>();
    errorMessage: string;

    // By default close the alert with statc time
    staticAlertClosed = false;

    // To declare the constant for from date and to date
    fromDate: any;
    toDate: any;

    // Declare the variable for filter - Report based on the date
    filter: Filter = new Filter();

    // For pagination we are declared the following variables
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    // Declare a modal popup
    @ViewChild('zoneModal') public zoneModal: ModalDirective;

    constructor(
        private zonalService: ZonalService,
        private parseLinks: JhiParseLinks,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            // console.log(data);
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    ngOnInit() {
        // console.log('ngOnInit');
        // Call a function to get list of zonals
        this.getZoneList();
        // Call a function to get active batch id
        // this.getActiveRecord();

        // To set the time for automatic alert close
        setTimeout(() => this.staticAlertClosed = true, 20000);

        // Set the success message with debounce time
        this.success.subscribe(message => this.successMessage = message);
        this.success.pipe(
            debounceTime(5000)
        ).subscribe(() => this.successMessage = null);

        // To set the error message with debounce time
        this.error.subscribe(message => this.errorMessage = message);
        this.error.pipe(
            debounceTime(5000)
        ).subscribe(() => this.errorMessage = null);
    }

    // Call a service function to get list of zonals
    getZoneList(): void {
        // Get the list of zone
        this.zonalService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        })
        .subscribe((res: HttpResponse<IZonal[]>) => this.paginateZonals(res.body, res.headers));
    }

    // Call a service function to get list of active batch
    getActiveRecord(): void {
        // Get the list of active batch record and assign a 0th index array value to an batch id
        // this.settingsService.getActiveRecord().subscribe((res: HttpResponse<IFinancialYearSettings[]>) => {
            // this.batchId = res.body[0].id;
        // });
    }

    // Send a zonal object to a service (create or update)
    save() {
        // console.log(this.zonalObject);
        this.createdAt = moment(this.zonalObject.createdAt).format(DATE_TIME_FORMAT);
        console.log(this.createdAt);
        this.updatedAt = moment(this.zonalObject.updatedAt).format(DATE_TIME_FORMAT);
        // console.log(this.updatedAt);
        this.zonalObject.updatedAt = moment(this.updatedAt, DATE_TIME_FORMAT);
        // console.log(this.zonalObject.updatedAt);
        if (this.zonalObject.id !== undefined) {
            this.alertTitle = 'updated';
            this.subscribeToSaveResponse(
                this.zonalService.update(this.zonalObject), this.alertTitle
            );
        } else {
            this.alertTitle = 'created';
            this.zonalObject.createdAt = moment(this.createdAt, DATE_TIME_FORMAT);
            console.log(this.zonalObject.createdAt);
            // this.zonalObject.financialYearId = this.batchId;
            this.subscribeToSaveResponse(
                this.zonalService.create(this.zonalObject), this.alertTitle
            );
        }
    }

    // To save the response with zonal
    private subscribeToSaveResponse(result: Observable<HttpResponse<IZonal>>, alertTitle) {
        result.subscribe(
            (res: HttpResponse<IZonal>) => {
                this.zoneModal.hide();
                this.zonalObject = new ZonalModel();
                // alert('Zone Created/Updated Successfully.');
                this.success.next(`Zone ${alertTitle} successfully`);
                this.getZoneList();
            },
            (res: HttpErrorResponse) => {
                // alert(res.error.fieldErrors[0].message);
                this.error.next(res.error.fieldErrors[0].message);
            }
        );
    }

    // show model popup to create zonal value
    createZone(): void {
        this.zonalObject = new ZonalModel();
        this.zoneModal.show();
        this.title = 'Create:';
    }

    // show model popup to update zonal value
    getZoneValue(value: ZonalModel): void {
        // console.log('Edit value');
        // console.log(value);
        this.zoneModal.show();
        this.zonalObject = value;
        this.title = `Update: ${value.zoneName}`;
        // console.log(this.title);
    }

    // delete zonal value
    deleteZonal(zonal: ZonalModel): void {
        this.zonalService.delete(zonal.id).subscribe(data => {
            // alert('Zone deleted Successfully.');
            this.success.next(`Zone deleted successfully`);
            this.zonals = this.zonals.filter(u => u !== zonal);
        });
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/zonal'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.getZoneList();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/zonal',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.getZoneList();
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    trackId(index: number, item: IZonal) {
        return item.id;
    }

    private paginateZonals(data: IZonal[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.queryCount = this.totalItems;
        this.zonals = data;
    }

    // If the zone model pop up closed, to call the get zone list function
    closeZoneModel(): void {
        // Hide the zone model pop-up
        this.zoneModal.hide();
        // Call the getZone List function
        this.getZoneList();
    }
}
