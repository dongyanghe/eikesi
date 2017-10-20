import { BaseEntity } from './../../shared';

export class SnapshotPending implements BaseEntity {
    constructor(
        public id?: number,
        public domainName?: string,
        public domainPath?: string,
        public createSource?: string,
        public priority?: string,
        public state?: string,
        public createBy?: number,
        public createDate?: any,
        public updateBy?: number,
        public updateDate?: any,
        public remarks?: string,
        public delFlag?: string,
    ) {
    }
}
