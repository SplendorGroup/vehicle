import { RequestUser } from './user';

type Filter = {
  id?: string;
  brand_id?: string;
  model?: string;
  color?: string;
  start_date?: string;
  end_date?: string;
  order?: 'LOW_PRICE' | 'HIGH_PRICE';
  page?: number;
};

export type Data<T> = {
  filter?: Filter & T;
  user?: RequestUser;
};

export type DataMount<T> = {
  body?: T;
  user?: RequestUser;
};

export type DataMountById<T> = {
  id: string;
  body?: T;
  user?: RequestUser;
};

export type DataChange<T> = {
  id: string;
  body?: T;
  user?: RequestUser;
};

export type DataChangeById = {
  id: string;
  user?: RequestUser;
};
