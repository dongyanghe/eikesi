import { Moment } from 'moment';

export interface IHistoryMessage {
    id?: number;
    content?: string;
    status?: string;
    createdDate?: Moment;
    createdId?: number;
    targetDate?: Moment;
    targetId?: number;
}

export class HistoryMessage implements IHistoryMessage {
    constructor(
        public id?: number,
        public content?: string,
        public status?: string,
        public createdDate?: Moment,
        public createdId?: number,
        public targetDate?: Moment,
        public targetId?: number
    ) {}
}
