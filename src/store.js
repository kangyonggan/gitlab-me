import Vue from 'vue';
import Vuex from 'vuex';
import axios from './libs/http';

Vue.use(Vuex);

export default new Vuex.Store({
  // 全局变量
  state: {
    // <el-main>是否处于加载中
    loading: false,
    user: JSON.parse(localStorage.getItem('user')) || {},
    type: '',
    code: ''
  },
  // get变量
  getters: {
    getLoading(state) {
      return state.loading;
    },
    getUser(state) {
      return state.user;
    },
    getType(state) {
      return state.type;
    },
    getCode(state) {
      return state.code;
    }
  },
  // set变量
  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setType(state, type) {
      state.type = type;
    },
    setCode(state, code) {
      state.code = code;
    }
  },
  // 异步操作
  actions: {
    getCodeType(state, code) {
      return new Promise(function (resolve, reject) {
        axios.get('validate/getCodeType?code=' + code).then(data => {
          state.type = data.type;
          resolve(data.type);
        }).catch(() => {
          state.type = '';
          state.code = '';
          reject();
        });
      });
    }
  }
});