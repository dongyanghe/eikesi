import { Moment } from 'moment';
import { IFlockRelation } from 'app/shared/model//flock-relation.model';

export interface ICustomerFlock {
    id?: number;
    name?: string;
    py?: string;
    pinYin?: string;
    imageUrl?: string;
    createdDate?: Moment;
    flockRelations?: IFlockRelation[];
}

export class CustomerFlock implements ICustomerFlock {
    constructor(
        public id?: number,
        public name?: string,
        public py?: string,
        public pinYin?: string,
        public imageUrl?: string,
        public createdDate?: Moment,
        public flockRelations?: IFlockRelation[]
    ) {}
}
