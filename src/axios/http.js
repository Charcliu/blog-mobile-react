import axios from "axios";
import { Component } from "react";
import { Toast } from "antd-mobile";

let base = "/api";

// 请求前拦截
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    Toast.fail("请求超时");
    return Promise.reject(err);
  }
);

// 返回后拦截
axios.interceptors.response.use(
  data => {
    return data.data;
  },
  err => {
    if (err.response.status === 504 || err.response.status === 404) {
      Toast.fail("服务器被吃了⊙﹏⊙∥");
    } else if (err.response.status === 401) {
      Toast.fail("登录信息失效⊙﹏⊙∥");
    } else if (err.response.status === 500) {
      Toast.fail("服务器开小差了⊙﹏⊙∥");
    }
    return Promise.reject(err);
  }
);

// @RequestBody请求
const postRequestBody = (url, params) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8"
    }
  });
};

// @RequsetParam请求
const postRequestParam = (url, params) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
    transformRequest: [
      function(data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ],
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

const get = url => {
  return axios({
    method: "get",
    url: `${base}${url}`
  });
};

const multiple = function(requsetArray, callback) {
  axios.all(requsetArray).then(axios.spread(callback));
};

Component.prototype.get = get;
Component.prototype.postRequestBody = postRequestBody;
Component.prototype.postRequestParam = postRequestParam;
Component.prototype.multiple = multiple;
