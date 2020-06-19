import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import qs from 'qs';
import constants from './constants';
import router from '../router';

// 10s超时
axios.defaults.timeout = 10000;

// 请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers[constants.HEADER_TOKEN_NAME] = localStorage.getItem(constants.LOCAL_TOKEN_NAME);
  if (config.data && config.type !== 'upload') {
    config.data = qs.stringify(config.data, {
      // 解决数组传递问题
      indices: false
    });
  }

  return config;
}, function (error) {
  return Promise.reject({
    respCo: constants.FAILURE,
    respMsg: error + ''
  });
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.respCo === constants.SUCCESS) {
    const token = response.headers[constants.HEADER_TOKEN_NAME];
    if (token) {
      localStorage.setItem(constants.LOCAL_TOKEN_NAME, token);
    }
    return response.data.data;
  } else if (response.data.respCo === constants.INVALID_LOGIN) {
    localStorage.removeItem('token');
    this.$store.commit('setUser', {});
    let redirectUrl = router.currentRoute.path;
    let query = qs.stringify(router.currentRoute.query);
    if (query) {
      redirectUrl += '?' + query;
    }
    router.push({
      path: '/users/sign_in',
      query: {
        redirectUrl: redirectUrl
      }
    });
    return Promise.reject(response.data);
  } else if (response.data.respCo === constants.PERMISSION_DENIED) {
    router.push({
      path: '/404'
    });
    return Promise.reject(response.data);
  } else {
    return Promise.reject(response.data);
  }
}, function (error) {
  if (!error.isAxiosError) {
    return Promise.reject(error);
  }
  return Promise.reject({
    respCo: constants.FAILURE,
    respMsg: error + ''
  });
});

Vue.use(VueAxios, axios);

export default axios;