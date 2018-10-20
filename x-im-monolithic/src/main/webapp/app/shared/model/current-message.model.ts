import { Moment } from 'moment';
import { IDialogue } from 'app/shared/model//dialogue.model';

export interface ICurrentMessage {
  id?: number;
  content?: string;
  status?: string;
  type?: string;
  createdDate?: Moment;
  createdId?: number;
  targetDate?: Moment;
  targetId?: number;
  dialogue?: IDialogue;
}

export const defaultValue: Readonly<ICurrentMessage> = {};
