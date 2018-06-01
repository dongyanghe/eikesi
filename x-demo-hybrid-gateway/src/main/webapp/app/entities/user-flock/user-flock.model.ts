import { BaseEntity } from './../../shared';

export class UserFlock implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public headImgUrl?: string,
    ) {
    }
}
