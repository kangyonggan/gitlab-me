import Vue from 'vue';
import axios from 'axios';

let env = {};

// 根据环境设置各种地址
axios.defaults.baseURL = '/api/';

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:8080/';
}

export default env;
Vue.prototype.env = env;



