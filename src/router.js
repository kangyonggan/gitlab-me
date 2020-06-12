import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';

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
                    permission: true,
                    menuType: 'Admin'
                },
                component: (resolve) => require(['./views/admin/index.vue'], resolve)
            },
            {
                path: 'manage',
                meta: {
                    permission: true,
                    menuType: 'Admin'
                },
                redirect: 'manage/users'
            },
            {
                path: 'manage/users',
                meta: {
                    permission: true,
                    menuType: 'Admin'
                },
                component: (resolve) => require(['./views/admin/manage/users/index.vue'], resolve)
            },
            {
                path: 'manage/groups',
                meta: {
                    permission: true,
                    menuType: 'Admin'
                },
                component: (resolve) => require(['./views/admin/manage/groups/index.vue'], resolve)
            },
            {
                path: 'manage/projects',
                meta: {
                    permission: true,
                    menuType: 'Admin'
                },
                component: (resolve) => require(['./views/admin/manage/projects/index.vue'], resolve)
            },
            {
                path: 'application_settings',
                meta: {
                    permission: true,
                    menuType: 'Admin'
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
                    permission: true,
                    menuType: 'Dashboard'
                },
                component: (resolve) => require(['./views/dashboard/index.vue'], resolve)
            },
            {
                path: 'profile',
                meta: {
                    permission: true,
                    menuType: 'Dashboard'
                },
                component: (resolve) => require(['./views/dashboard/profile/index.vue'], resolve)
            }
        ]
    },
    {
        path: '*',
        meta: {
            icon: 'el-icon-warning',
            title: 'The page could not be found or you don\'t have permission to view it.'
        },
        component: (resolve) => require(['./views/404.vue'], resolve)
    }
];

const router = new VueRouter({
    mode: 'history',
    routes: routers
});


router.beforeEach(async (to, from, next) => {
    store.commit('setLoading', true);

    // 无需权限的界面
    if (!to.meta.permission) {
        next();
        return;
    }

    // 如果没有token，重定向到登录界面
    let token = localStorage.getItem('token');
    if (!token) {
        next({
            path: '/users/sign_in',
            query: {
                redirectUrl: to.fullPath
            }
        });
        return;
    }

    // Tips：只有登录之后才能走到这里

    // 登录了，但是没有权限，到403界面
    if (to.fullPath.startsWith('/admin') && store.getters.getUser.accessLevel !== 'Admin') {
        next({
            path: '/404'
        });
        return;
    }

    // 鉴权成功，放行
    next();
});

router.afterEach(() => {
    store.commit('setLoading', false);
});

export default router;
export {routers};