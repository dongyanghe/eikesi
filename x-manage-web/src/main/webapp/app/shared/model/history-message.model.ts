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

export const defaultValue: Readonly<IHistoryMessage> = {};
