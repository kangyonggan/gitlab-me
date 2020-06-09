import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routers = [
    {
        path: '/login',
        meta: {
            title: '登录'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
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
    next();
});

router.afterEach(() => {
});

export default router;
export {routers};