import Vue from 'vue';
import App from './App.vue';
import Router from './router';
import Store from './store';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import '@/libs/env';
import '@/libs/util';
import '@/libs/http';
import '@/libs/common';
import '@/libs/constants';
import './components/index';
import VueClipboard from 'vue-clipboard2';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

Vue.use(ElementUI, {locale});

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
Vue.use(mavonEditor);

new Vue({
  router: Router,
  store: Store,
  render: h => h(App)
}).$mount('#app');
