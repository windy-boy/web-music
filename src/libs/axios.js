import axios from "axios";
import { Message } from "view-design";
// import store from '@/store'
//import config from '@/config'
import router from "@/router/index";

// create an axios instance
const service = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "./" : "/",
  timeout: 30000 // request timeout
});
service.interceptors.response.use(
  response => {
    if (response.data.code !== 200) {
      Message.error(
        response.data.Message || `response.data.Code：${response.data.code}`
      );
    }
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          /// store.dispatch('LogOut')
          router.replace({
            path: "/"
          });
          break;
        case 500:
          Message.error({
            content: "网络异常",
            duration: 10,
            closable: true
          });
          break;
        default:
          Message.error({
            content: "网络异常",
            duration: 10,
            closable: true
          });
      }
    } else if (error.message.indexOf("timeout") >= 0) {
      Message.error({
        content: "连接服务器响应超时，可能是网速慢或服务器繁忙。",
        duration: 10,
        closable: true
      });
    }
    return Promise.reject(error.response.data); // 返回接口返回的错误信息
  }
);

export default service;
