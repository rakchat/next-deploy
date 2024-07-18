import { TablePaginationConfig } from "antd";
import { BaseQueryParams } from "./type";
import { SortOrder } from "antd/es/table/interface";

export const initialPagination: TablePaginationConfig = {
  current: 1,
  pageSize: 10,
};

export const NUMBER_REGEX = /^\d*$/g;
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const NUMBER_ONLY_INPUT = ["-", "+", "e", "E"];

export const getURLQueryParams = (
  query: BaseQueryParams,
  id?: string | number
) => {
  const { ...rest } = query;
  const qParams = new URLSearchParams();
  if (rest) {
    Object.entries(rest).forEach((ele) => {
      const key = ele[0];
      const val = ele[1];
      if (val) {
        qParams.append(key, val as string);
      } else {
        qParams.delete(key);
      }
    });
  }
  if (id) {
    return `${id}?${qParams}`;
  } else {
    return `?${qParams}`;
  }
};

export const sortQuery = (queryParam: any, type: string) => {
  if (queryParam["sortBy"] === type && queryParam["orderBy"]) {
    return `${(queryParam["orderBy"] as SortOrder)?.toLowerCase()}`.concat(
      "end"
    ) as SortOrder;
  } else {
    return undefined;
  }
};
