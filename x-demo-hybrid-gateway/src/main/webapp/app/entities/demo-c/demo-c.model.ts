import { BaseEntity } from './../../shared';

export class DemoC implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: string,
        public demoBName?: string,
        public demoBId?: number,
    ) {
    }
}
