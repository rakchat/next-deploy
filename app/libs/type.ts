import { SortOrder } from "antd/es/table/interface";

export interface IBaseData {
  active?: boolean | string;
  deleted?: boolean;
  createdAt?: Date | string;
  createdBy?: string;
  updatedAt?: Date | string;
  updatedBy?: string;
}

export interface BaseQueryParams {
  active?: boolean | string;
  deleted?: boolean;
  id?: number | string;
  name?: string;
  size?: number;
  page?: number;
  query?: string;
  sortBy?: string;
  orderBy?: string | SortOrder;
}

export interface IResponse<DT> {
  message: string;
  statusCode: number;
  success: boolean;
  error: string[];
  data: DT;
}

export interface IPageResponse<DT> {
  total: number;
  perPage: number;
  totalPage: number;
  currentPage?: number;
  data: DT;
}

export interface IGlobalResponse extends IBaseData {
  id: number;
  name: string;
  value?: number | string;
  label?: string;
}

export interface ITableSorter {
  field: string;
  order: string;
}

export interface IUsers {
  id: number;
  email: string;
  name: string;
}
