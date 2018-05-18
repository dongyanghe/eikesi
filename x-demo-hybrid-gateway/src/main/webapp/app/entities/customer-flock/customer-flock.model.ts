import { BaseEntity } from './../../shared';

export class CustomerFlock implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public py?: string,
        public pinYin?: string,
        public imageUrl?: string,
        public createdDate?: any,
        public flockRelations?: BaseEntity[],
    ) {
    }
}
