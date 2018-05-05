import { BaseEntity } from './../../../models';

export class Blog implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public handle?: string,
    ) {
    }
}
