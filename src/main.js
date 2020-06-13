import Vue from 'vue';
import App from './App.vue';
import Router from './router';
import Store from './store';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css';
import '@/libs/env';
import '@/libs/util';
import '@/libs/http';
import '@/libs/common';
import './components/index';

Vue.use(ElementUI, {locale});

new Vue({
  router: Router,
  store: Store,
  render: h => h(App)
}).$mount('#app');
