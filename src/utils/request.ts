import Axios from "axios";
import { message } from "antd";

const service = Axios.create({
  
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('accesstoken');
    // (config.headers as any).accessToken = token
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data.code === 500) {
      message.open({
        type: 'error',
        content: response.data.msg
      })
      return Promise.reject("error");
    } else {
      return response.data
    }
  },
  (error) => {
    message.open({
      type: 'error',
      content: error.response.data.msg
    })
    return Promise.reject(error);
  }
);

export default service;
