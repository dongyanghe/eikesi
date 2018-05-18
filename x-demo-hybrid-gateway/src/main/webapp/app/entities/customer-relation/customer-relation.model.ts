import { BaseEntity } from './../../shared';

export class CustomerRelation implements BaseEntity {
    constructor(
        public id?: number,
        public remarkName?: string,
        public py?: string,
        public pinYin?: string,
        public type?: string,
        public createdDate?: any,
        public customerFirstName?: string,
        public customerId?: number,
    ) {
    }
}
