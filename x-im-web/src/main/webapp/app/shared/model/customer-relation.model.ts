import { Moment } from 'moment';

export interface ICustomerRelation {
  id?: number;
  remarkName?: string;
  py?: string;
  pinYin?: string;
  type?: string;
  createdDate?: Moment;
  customerFirstName?: string;
  customerId?: number;
}

export const defaultValue: Readonly<ICustomerRelation> = {};
