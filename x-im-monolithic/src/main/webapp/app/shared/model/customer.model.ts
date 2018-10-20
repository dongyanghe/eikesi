import { Moment } from 'moment';
import { ICustomerRelation } from 'app/shared/model//customer-relation.model';
import { IFlockRelation } from 'app/shared/model//flock-relation.model';

export interface ICustomer {
  id?: number;
  mobile?: string;
  firstName?: string;
  lastName?: string;
  py?: string;
  pinYin?: string;
  passwordHash?: string;
  email?: string;
  imageUrl?: string;
  activated?: boolean;
  langKey?: string;
  activationKey?: string;
  resetKey?: string;
  resetDate?: Moment;
  createdBy?: string;
  createdDate?: Moment;
  customerRelations?: ICustomerRelation[];
  flockRelations?: IFlockRelation[];
}

export const defaultValue: Readonly<ICustomer> = {
  activated: false
};
