import axios from "axios";
import store from "../store";
// create an axios instance
const BASE_URL = window.g.baseUrl;
const timeout = window.g.timeout;

const request = axios.create({
  //baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  baseURL: BASE_URL,
  timeout: timeout // request timeout
});
import { message } from "ant-design-vue";
// request interceptor
request.interceptors.request.use(
  config => {
    // Do something before request is sent
    console.info("请求拦截");
    config.headers["Authorization"] = store.state.token;
    return config;
  },
  error => {
    //message.error(error.message)
    return Promise.reject(error);
  }
);

// response interceptor
request.interceptors.response.use(
  response => {
    //  console.info(response);

    if (response.data.code == "401") {
      //跳转到登录页面
      store.dispatch("LogOut").then(() => {
        location.reload();
        //this.$router.push({path:'/login'})
      });
    }
    return response;
  },
  error => {
    // message.error(error.message)
    return Promise.reject(error);
  }
);

export default request;
