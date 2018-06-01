import { BaseEntity } from './../../shared';

export class Customer implements BaseEntity {
    constructor(
        public id?: number,
        public mobile?: string,
        public firstName?: string,
        public lastName?: string,
        public py?: string,
        public pinYin?: string,
        public passwordHash?: string,
        public email?: string,
        public imageUrl?: string,
        public activated?: boolean,
        public langKey?: string,
        public activationKey?: string,
        public resetKey?: string,
        public resetDate?: any,
        public createdBy?: string,
        public createdDate?: any,
        public customerRelations?: BaseEntity[],
        public flockRelations?: BaseEntity[],
    ) {
        this.activated = false;
    }
}
