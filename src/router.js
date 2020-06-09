import Vue from 'vue';
import VueRouter from 'vue-router';
import Util from './libs/util';

Vue.use(VueRouter);

const routers = [
    {
        path: '/users/',
        component: (resolve) => require(['./views/users/layout.vue'], resolve),
        children: [
            {
                path: 'sign_in',
                meta: {
                    title: 'Sign in'
                },
                component: (resolve) => require(['./views/users/sign-in.vue'], resolve)
            },
            {
                path: 'sign_up',
                meta: {
                    title: 'Sign up'
                },
                component: (resolve) => require(['./views/users/sign-up.vue'], resolve)
            }
        ]
    },
    {
        path: '/',
        component: (resolve) => require(['./views/layout.vue'], resolve),
        children: [
            {
                path: '/',
                meta: {
                    icon: 'el-icon-s-home',
                    title: '首页'
                },
                component: (resolve) => require(['./views/index.vue'], resolve)
            },
            {
                path: '403',
                meta: {
                    icon: 'el-icon-warning',
                    title: '权限不足'
                },
                component: (resolve) => require(['./views/403.vue'], resolve)
            },
            {
                path: '*',
                meta: {
                    icon: 'el-icon-warning',
                    title: '资源不存在'
                },
                component: (resolve) => require(['./views/404.vue'], resolve)
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    routes: routers
});

router.beforeEach(async (to, from, next) => {
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
});

export default router;
export {routers};