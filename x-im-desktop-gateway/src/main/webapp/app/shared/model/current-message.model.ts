import { Moment } from 'moment';

export interface ICurrentMessage {
    id?: number;
    content?: string;
    status?: string;
    type?: string;
    createdDate?: Moment;
    createdId?: number;
    targetDate?: Moment;
    targetId?: number;
    dialogueTargetId?: string;
    dialogueId?: number;
}

export class CurrentMessage implements ICurrentMessage {
    constructor(
        public id?: number,
        public content?: string,
        public status?: string,
        public type?: string,
        public createdDate?: Moment,
        public createdId?: number,
        public targetDate?: Moment,
        public targetId?: number,
        public dialogueTargetId?: string,
        public dialogueId?: number
    ) {}
}
