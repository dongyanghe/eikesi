import { Moment } from 'moment';
import { ICurrentMessage } from 'app/shared/model//current-message.model';

export interface IDialogue {
    id?: number;
    createdDate?: Moment;
    createdId?: number;
    targetId?: number;
    targetType?: string;
    currentMessages?: ICurrentMessage[];
}

export class Dialogue implements IDialogue {
    constructor(
        public id?: number,
        public createdDate?: Moment,
        public createdId?: number,
        public targetId?: number,
        public targetType?: string,
        public currentMessages?: ICurrentMessage[]
    ) {}
}
