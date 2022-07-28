import { Moment } from 'moment';

export interface IZonal {
    id?: number;
    zoneName?: string;
    zoneAddress?: string;
    zoneIncharge?: string;
    status?: number;
    createdAt?: Moment;
    updatedAt?: Moment;
}

export class Zonal implements IZonal {
    constructor(
        public id?: number,
        public zoneName?: string,
        public zoneAddress?: string,
        public zoneIncharge?: string,
        public status?: number,
        public createdAt?: Moment,
        public updatedAt?: Moment
    ) {}
}

export class ZonalModel {
    id?: number;
    zoneName?: string;
    zoneAddress?: string;
    zoneIncharge?: string;
    status?: number;
    createdAt?: Moment;
    updatedAt?: Moment;
}
