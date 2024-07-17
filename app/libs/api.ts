import axios, { AxiosError } from "axios";
import { notification } from "antd";

const api = axios.create({
  baseURL: "/api/v1.0",
});

api.interceptors.request.use((config) => {
  console.log("config  : ", config);

  return config;
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  (err: AxiosError) => {
    const { response } = err;
    if (response?.status === 401) {
      alert("ERROR CODE: 401");
    } else {
      openNotificationWithIcon(
        "error",
        response?.status as number,
        response?.statusText as string
      );
    }
    return Promise.reject(err);
  }
);

const openNotificationWithIcon = (
  type: "error" | "info",
  message: string | number,
  description: string
) => {
  notification[type]({
    message,
    description: description ? description : "Something went wrong!",
  });
};

export default api;
