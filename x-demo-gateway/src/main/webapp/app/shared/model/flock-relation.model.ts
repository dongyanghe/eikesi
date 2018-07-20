import { Moment } from 'moment';

export interface IFlockRelation {
    id?: number;
    remarkName?: string;
    py?: string;
    pinYin?: string;
    type?: string;
    createdDate?: Moment;
    customerFirstName?: string;
    customerId?: number;
    customerFlockName?: string;
    customerFlockId?: number;
}

export class FlockRelation implements IFlockRelation {
    constructor(
        public id?: number,
        public remarkName?: string,
        public py?: string,
        public pinYin?: string,
        public type?: string,
        public createdDate?: Moment,
        public customerFirstName?: string,
        public customerId?: number,
        public customerFlockName?: string,
        public customerFlockId?: number
    ) {}
}
