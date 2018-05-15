import { BaseEntity } from './../../shared';

export class DemoB implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public status?: string,
        public demoCS?: BaseEntity[],
        public demoAId?: number,
    ) {
    }
}
