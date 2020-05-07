import axios from "axios";
import Cookies from "js-cookie";
import { Notify } from "vant";
import { setStore, getStore } from "@/utils/storage";
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
let baseURL = ''
if (IS_PROD) {
  baseURL = "http://service.lovetxt.xyz";
} else {
  baseURL = "http://127.0.0.1:3000";
}

axios.defaults.headers.Authorization = 'application/x-www-form-urlencoded';
export const service = axios.create({
  baseURL: baseURL,
  timeout: 60000
});

service.interceptors.request.use(
  config => {
    let token = Cookies.get("token");
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = `${token}`;
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  err => {
    // Message.error("请求超时");
    return Promise.resolve(err);
  }
);

// http response 拦截器
service.interceptors.response.use(
  response => {
    const data = response.data;
    // if (
    //   response.headers.token &&
    //   response.headers.token != "" &&
    //   response.headers.token != null
    // ) {
    //   setStore("Authorization", response.headers.token);
    // }

    // 根据返回的code值来做不同的处理(和后端约定)
    switch (data.code) {
      case 400:
        // // 未登录 清除已登录状态
        Notify({ type: 'danger', message: data.msg || '参数错误' })
        break;
      case 401:
        // // 未登录 清除已登录状态
        Notify({ type: 'danger', message: data.msg })
        Cookies.set("userInfo", "");
        Cookies.set("token", "");
        this.$router.replace("/login");
        break;
      case 403:
        // 没有权限
        if (data.msg !== null) {
          Notify({ type: 'danger', message: data.msg })
        } else {
          Notify({ type: 'danger', message: "未知错误" })
        }
        break;
      case 500:
        // 错误
        if (data.msg !== null) {
          Notify({ type: 'danger', message: data.msg })
        } else {
          Notify({ type: 'danger', message: "未知错误" })
        }
        break;
      case 100:
        // 错误
        if (data.msg !== null) {
          Notify({ type: 'danger', message: data.msg })
        } else {
          Notify({ type: 'danger', message: "未知错误" })
        }
        break;
      default:
        return data;
    }

    return data;
  },
  err => {
    return Promise.reject(err);
  }
);

export const postRequest = (url, params) => {
  let Authorization = getStore("Authorization");
  return service({
    method: "post",
    url: url,
    data: params,
    transformRequest: [
      function (data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ],
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: Authorization
    }
  });
};

export const postRequests = (url, params) => {
  let Authorization = getStore("Authorization");
  return service({
    method: "post",
    url: url,
    data: params,
    headers: {
      Authorization: Authorization
    }
  });
};
export const getRequest = (url, params) => {
  let Authorization = getStore("Authorization");
  return service({
    method: "get",
    url: url,
    params: params,
    headers: {
      Authorization: Authorization
    }
  });
};

export const deleteRequest = (url, params) => {
  let Authorization = getStore("Authorization");
  return service({
    method: "delete",
    url: url,
    params: params,
    headers: {
      Authorization: Authorization
    }
  });
};
export const downLoadRequest = (url, params) => {
  let Authorization = getStore("Authorization");
  return service({
    method: "post",
    url: url,
    data: params,
    responseType: "blob",
    headers: {
      Authorization: Authorization
    }
  });
};
export const patchRequest = (url, params) => {
  let Authorization = getStore("Authorization");
  return service({
    method: "patch",
    url: url,
    data: params,
    transformRequest: [
      function (data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ],
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: Authorization
    }
  });
};

//以下为个人使用补充
export const putRequest = (url, data) => {
  let Authorization = getStore("Authorization");
  return service({
    method: "put",
    url: url,
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: Authorization
    }
  });
};
export const deletes = (url, params) => {
  let Authorization = getStore("Authorization");
  return service({
    method: "delete",
    url: url + params,
    headers: {
      Authorization: Authorization
    }
  });
};
export const postRequestJson = (url, params) => {
  let Authorization = getStore("Authorization");
  return service({
    method: "post",
    url: url,
    data: params,
    transformRequest: [
      function (data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ],
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: Authorization
    }
  });
};
