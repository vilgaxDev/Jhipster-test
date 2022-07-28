import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IZonal } from 'app/shared/model/zonal.model';

type EntityResponseType = HttpResponse<IZonal>;
type EntityArrayResponseType = HttpResponse<IZonal[]>;

@Injectable({ providedIn: 'root' })
export class ZonalService {
    private resourceUrl = SERVER_API_URL + 'api/zonals';

    constructor(private http: HttpClient) {}

    create(zonal: IZonal): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(zonal);
        return this.http
            .post<IZonal>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(zonal: IZonal): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(zonal);
        return this.http
            .put<IZonal>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IZonal>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IZonal[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(zonal: IZonal): IZonal {
        const copy: IZonal = Object.assign({}, zonal, {
            createdAt: zonal.createdAt != null && zonal.createdAt.isValid() ? zonal.createdAt.toJSON() : null,
            updatedAt: zonal.updatedAt != null && zonal.updatedAt.isValid() ? zonal.updatedAt.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createdAt = res.body.createdAt != null ? moment(res.body.createdAt) : null;
        res.body.updatedAt = res.body.updatedAt != null ? moment(res.body.updatedAt) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((zonal: IZonal) => {
            zonal.createdAt = zonal.createdAt != null ? moment(zonal.createdAt) : null;
            zonal.updatedAt = zonal.updatedAt != null ? moment(zonal.updatedAt) : null;
        });
        return res;
    }
}
