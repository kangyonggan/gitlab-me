import Vue from 'vue';
import VueRouter from 'vue-router';
import Util from './libs/util';

// Avoided redundant navigation to current location
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err);
};

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
            },
            {
                path: 'reset_password',
                meta: {
                    title: 'Reset password'
                },
                component: (resolve) => require(['./views/users/reset-password.vue'], resolve)
            }
        ]
    },
    {
        path: '/admin',
        component: (resolve) => require(['./views/layout.vue'], resolve),
        children: [
            {
                path: '/',
                meta: {
                    title: 'Overview'
                },
                component: (resolve) => require(['./views/admin/index.vue'], resolve)
            },
            {
                path: 'manage',
                redirect: 'manage/projects',
                meta: {
                    icon: 'el-icon-menu',
                    title: 'Manage'
                }
            },
            {
                path: 'manage/projects',
                meta: {
                    title: 'Projects'
                },
                component: (resolve) => require(['./views/admin/manage/projects/index.vue'], resolve)
            },
            {
                path: 'manage/users',
                meta: {
                    title: 'Users'
                },
                component: (resolve) => require(['./views/admin/manage/users/index.vue'], resolve)
            },
            {
                path: 'manage/groups',
                meta: {
                    title: 'Groups'
                },
                component: (resolve) => require(['./views/admin/manage/groups/index.vue'], resolve)
            },
            {
                path: 'application_settings',
                meta: {
                    title: 'Settings'
                },
                component: (resolve) => require(['./views/admin/settings/index.vue'], resolve)
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
                    icon: 'el-icon-dashboard',
                    title: 'Dashboard'
                },
                component: (resolve) => require(['./views/dashboard/index.vue'], resolve)
            },
            {
                path: 'profile',
                meta: {
                    icon: 'el-icon-s-custom',
                    title: 'Profile'
                },
                component: (resolve) => require(['./views/dashboard/profile/index.vue'], resolve)
            },
            {
                path: '403',
                meta: {
                    icon: 'el-icon-warning',
                    title: 'Permission deny'
                },
                component: (resolve) => require(['./views/403.vue'], resolve)
            },
            {
                path: '*',
                meta: {
                    icon: 'el-icon-warning',
                    title: 'Page not found'
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