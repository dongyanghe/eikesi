import { Moment } from 'moment';
import { IFlockRelation } from 'app/shared/model/flock-relation.model';

export interface ICustomerFlock {
  id?: number;
  name?: string;
  HeadImgUrl?: string;
  py?: string;
  pinYin?: string;
  imageUrl?: string;
  createdDate?: Moment;
  flockRelations?: IFlockRelation[];
}

export const defaultValue: Readonly<ICustomerFlock> = {};
