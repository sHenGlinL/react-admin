import Axios from "axios";
import { ElMessage } from "element-plus";

import type { AxiosRequestConfig, AxiosResponse } from "axios";

const service = Axios.create({
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // (config.headers as any).accessToken = 'e6ac0880-2f44-483c-a4ec-2bbd22165f3d'
    const token = localStorage.getItem('accesstoken');
    (config.headers as any).accessToken = token
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.code === 500) {
      ElMessage({
        message: response.data.msg,
        type: "error",
        duration: 3000,
      });
      return Promise.reject("error");
    } else {
      return response.data
    }
  },
  (error) => {
    ElMessage({
      message: error.response.data.msg,
      type: "error",
      duration: 3000,
    });
    return Promise.reject(error);
  }
);

export default service;
