import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model//customer.model';
import { ICustomerFlock } from 'app/shared/model//customer-flock.model';

export interface IFlockRelation {
  id?: number;
  remarkName?: string;
  py?: string;
  pinYin?: string;
  type?: string;
  createdDate?: Moment;
  customer?: ICustomer;
  customerFlock?: ICustomerFlock;
}

export const defaultValue: Readonly<IFlockRelation> = {};
