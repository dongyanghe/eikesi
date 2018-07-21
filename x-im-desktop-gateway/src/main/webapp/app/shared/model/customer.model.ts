import { Moment } from 'moment';
import { ICustomerRelation } from 'app/shared/model//customer-relation.model';
import { IFlockRelation } from 'app/shared/model//flock-relation.model';

export interface ICustomer {
    id?: number;
    mobile?: string;
    firstName?: string;
    lastName?: string;
    py?: string;
    pinYin?: string;
    passwordHash?: string;
    email?: string;
    imageUrl?: string;
    activated?: boolean;
    langKey?: string;
    activationKey?: string;
    resetKey?: string;
    resetDate?: Moment;
    createdBy?: string;
    createdDate?: Moment;
    customerRelations?: ICustomerRelation[];
    flockRelations?: IFlockRelation[];
}

export class Customer implements ICustomer {
    constructor(
        public id?: number,
        public mobile?: string,
        public firstName?: string,
        public lastName?: string,
        public py?: string,
        public pinYin?: string,
        public passwordHash?: string,
        public email?: string,
        public imageUrl?: string,
        public activated?: boolean,
        public langKey?: string,
        public activationKey?: string,
        public resetKey?: string,
        public resetDate?: Moment,
        public createdBy?: string,
        public createdDate?: Moment,
        public customerRelations?: ICustomerRelation[],
        public flockRelations?: IFlockRelation[]
    ) {
        this.activated = false;
    }
}
