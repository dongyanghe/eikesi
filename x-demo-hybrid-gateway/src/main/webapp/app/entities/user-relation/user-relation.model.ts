import { BaseEntity } from './../../shared';

export class UserRelation implements BaseEntity {
    constructor(
        public id?: number,
        public remarkName?: string,
        public type?: string,
    ) {
    }
}
