import axios from "axios";

import { getCookie } from "../cookie";

const defaultOptions = {
  baseURL: process.env.REACT_APP_BASE_URL,
};

const axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(
  async (config: any) => {
    const tokenCookie = getCookie("token");

    config.headers = {
      Authorization: `Bearer ${tokenCookie}`,
      "ngrok-skip-browser-warning": "true",
    };

    return config;
  },

  (error) => Promise.reject(error)
);

export default axiosInstance;
