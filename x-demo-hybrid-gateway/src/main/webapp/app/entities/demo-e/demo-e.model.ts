import { BaseEntity } from './../../shared';

export class DemoE implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: string,
        public demoDName?: string,
        public demoDId?: number,
        public demoAS?: BaseEntity[],
    ) {
    }
}
