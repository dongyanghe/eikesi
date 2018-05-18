import { BaseEntity } from './../../shared';

export class FlockRelation implements BaseEntity {
    constructor(
        public id?: number,
        public remarkName?: string,
        public py?: string,
        public pinYin?: string,
        public type?: string,
        public createdDate?: any,
        public customerFirstName?: string,
        public customerId?: number,
        public customerFlockName?: string,
        public customerFlockId?: number,
    ) {
    }
}
