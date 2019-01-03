import { Moment } from 'moment';

export interface IFlockRelation {
  id?: number;
  remarkName?: string;
  py?: string;
  pinYin?: string;
  type?: string;
  createdDate?: Moment;
  customerFirstName?: string;
  customerId?: number;
  customerFlockName?: string;
  customerFlockId?: number;
}

export const defaultValue: Readonly<IFlockRelation> = {};
