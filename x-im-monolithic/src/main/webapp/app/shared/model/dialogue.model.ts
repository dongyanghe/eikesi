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

export const defaultValue: Readonly<IDialogue> = {};
