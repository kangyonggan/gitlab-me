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
    menus: [],
    breadcrumbs: [],
    codeData: {}
  },
  // get变量
  getters: {
    getLoading(state) {
      return state.loading;
    },
    getUser(state) {
      return state.user;
    },
    getMenus(state) {
      return state.menus;
    },
    getBreadcrumbs(state) {
      return state.breadcrumbs;
    },
    getCodeData(state) {
      return state.codeData;
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
    setMenus(state, menus) {
      state.menus = menus;
    },
    setBreadcrumbs(state, breadcrumbs) {
      state.breadcrumbs = breadcrumbs;
    }
  },
  // 异步操作
  actions: {
    getCodeType(state, code) {
      return new Promise(function (resolve, reject) {
        axios.get('validate/getCodeType?code=' + code).then(data => {
          state.codeData = data;
          resolve(data);
        }).catch(() => {
          reject();
        });
      });
    }
  }
});