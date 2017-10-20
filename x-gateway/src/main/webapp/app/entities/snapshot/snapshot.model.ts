import { BaseEntity } from './../../shared';

export class Snapshot implements BaseEntity {
    constructor(
        public id?: number,
        public domainName?: string,
        public domainPath?: string,
        public createSource?: string,
        public dayTime?: number,
        public weekTime?: number,
        public monthTime?: number,
        public yearTime?: number,
        public historyTime?: number,
        public filePath?: string,
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
