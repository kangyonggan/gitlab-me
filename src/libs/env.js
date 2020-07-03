import Vue from 'vue';
import axios from 'axios';

let env = {};

// 根据环境设置各种地址
axios.defaults.baseURL = '/gitlab-api/';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://127.0.0.1:8080/';
} else if (process.env.NODE_ENV === 'hd') {
  axios.defaults.baseURL = 'https://kangyonggan.com/gitlab-api/';
}

export default env;
Vue.prototype.env = env;



