import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model//customer.model';

export interface ICustomerRelation {
  id?: number;
  remarkName?: string;
  py?: string;
  pinYin?: string;
  type?: string;
  createdDate?: Moment;
  customer?: ICustomer;
}

export const defaultValue: Readonly<ICustomerRelation> = {};
