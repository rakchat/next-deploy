import api from "../api";
import { BaseQueryParams, IPageResponse, IUsers } from "../type";

const path = "/users";

const findAll = async (query?: BaseQueryParams): Promise<IUsers[]> => {
  const { data } = await api.get<IUsers[]>(path, {
    ...(query && { params: query }),
  });
  return data;
};

// const findAll = async (
//   query?: BaseQueryParams
// ): Promise<IPageResponse<IUsers[]>> => {
//   const { data } = await api.get<IPageResponse<IUsers[]>>(path, {
//     ...(query && { params: query }),
//   });
//   return data;
// };

export const UserAPI = {
  findAll,
};
