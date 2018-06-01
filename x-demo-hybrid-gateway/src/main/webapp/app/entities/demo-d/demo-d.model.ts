import { BaseEntity } from './../../shared';

export class DemoD implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: string,
        public demoES?: BaseEntity[],
        public demoAS?: BaseEntity[],
    ) {
    }
}
