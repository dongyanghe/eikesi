import { Moment } from 'moment';

export interface ICustomerRelation {
    id?: number;
    remarkName?: string;
    py?: string;
    pinYin?: string;
    type?: string;
    createdDate?: Moment;
    customerFirstName?: string;
    customerId?: number;
}

export class CustomerRelation implements ICustomerRelation {
    constructor(
        public id?: number,
        public remarkName?: string,
        public py?: string,
        public pinYin?: string,
        public type?: string,
        public createdDate?: Moment,
        public customerFirstName?: string,
        public customerId?: number
    ) {}
}
