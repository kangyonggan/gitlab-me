import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import qs from 'qs';

// 10s超时
axios.defaults.timeout = 10000;

// 请求拦截器
axios.interceptors.request.use(function (config) {
    if (config.data && config.type !== 'upload') {
        config.data = qs.stringify(config.data, {
            // 解决数组传递问题
            indices: false
        });
    }

    return config;
}, function (error) {
    return Promise.reject({
        respCo: '9999',
        respMsg: error + ''
    });
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.data.respCo === '0000') {
        return response.data.data;
    } else {
        return Promise.reject(response.data);
    }
}, function (error) {
    if (!error.isAxiosError) {
        return Promise.reject(error);
    }
    return Promise.reject({
        respCo: '9999',
        respMsg: error + ''
    });
});

Vue.use(VueAxios, axios);

export default axios;