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

export const defaultValue: Readonly<ICurrentMessage> = {};
