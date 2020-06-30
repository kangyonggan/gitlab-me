import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import util from './libs/util';
import constants from './libs/constants';

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
          title: 'Sign In'
        },
        component: (resolve) => require(['./views/users/sign-in.vue'], resolve)
      },
      {
        path: 'sign_up',
        meta: {
          title: 'Sign Up'
        },
        component: (resolve) => require(['./views/users/sign-up.vue'], resolve)
      },
      {
        path: 'reset_password',
        meta: {
          title: 'Reset Password'
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
        path: 'overview',
        redirect: '/admin/users'
      },
      {
        path: 'users',
        meta: {
          permission: true,
          menuType: 'Admin'
        },
        component: (resolve) => require(['./views/admin/overview/users/index.vue'], resolve)
      },
      {
        path: 'users/new',
        meta: {
          title: 'New User',
          permission: true,
          menuType: 'Admin',
          parentPath: '/admin/users'
        },
        component: (resolve) => require(['./views/admin/overview/users/form.vue'], resolve)
      },
      {
        path: 'users/:username/edit',
        meta: {
          title: 'Edit User',
          permission: true,
          menuType: 'Admin',
          parentPath: '/admin/users'
        },
        component: (resolve) => require(['./views/admin/overview/users/form.vue'], resolve)
      },
      {
        path: 'users/:username',
        meta: {
          title: 'User Detail',
          permission: true,
          menuType: 'Admin',
          parentPath: '/admin/users'
        },
        component: (resolve) => require(['./views/admin/overview/users/detail.vue'], resolve)
      },
      {
        path: 'groups',
        meta: {
          permission: true,
          menuType: 'Admin'
        },
        component: (resolve) => require(['./views/admin/overview/groups/index.vue'], resolve)
      },
      {
        path: 'groups/new',
        meta: {
          title: 'New Group',
          permission: true,
          menuType: 'Admin',
          parentPath: '/admin/groups'
        },
        component: (resolve) => require(['./views/admin/overview/groups/form.vue'], resolve)
      },
      {
        path: 'groups/:groupPath/edit',
        meta: {
          title: 'Edit Group',
          permission: true,
          menuType: 'Admin',
          parentPath: '/admin/groups'
        },
        component: (resolve) => require(['./views/admin/overview/groups/form.vue'], resolve)
      },
      {
        path: 'groups/:groupPath',
        meta: {
          title: 'Groups Detail',
          permission: true,
          menuType: 'Admin',
          parentPath: '/admin/groups'
        },
        component: (resolve) => require(['./views/admin/overview/groups/detail.vue'], resolve)
      },
      {
        path: 'projects',
        meta: {
          permission: true,
          menuType: 'Admin'
        },
        component: (resolve) => require(['./views/admin/overview/projects/index.vue'], resolve)
      },
      {
        path: 'projects/new',
        meta: {
          title: 'New Project',
          permission: true,
          menuType: 'Admin',
          parentPath: '/admin/projects'
        },
        component: (resolve) => require(['./views/admin/overview/projects/form.vue'], resolve)
      },
      {
        path: 'projects/:namespace/:projectPath',
        meta: {
          title: 'Project Detail',
          permission: true,
          menuType: 'Admin',
          parentPath: '/admin/projects'
        },
        component: (resolve) => require(['./views/admin/overview/projects/detail.vue'], resolve)
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
    path: '/profile',
    component: (resolve) => require(['./views/layout.vue'], resolve),
    children: [
      {
        path: '/',
        meta: {
          permission: true,
          menuType: 'Profile'
        },
        component: (resolve) => require(['./views/profile/index.vue'], resolve)
      },
      {
        path: 'audit_log',
        meta: {
          permission: true,
          menuType: 'Profile'
        },
        component: (resolve) => require(['./views/profile/auditLog/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/groups',
    component: (resolve) => require(['./views/layout.vue'], resolve),
    children: [
      {
        path: ':path',
        name: 'groups',
        meta: {
          permission: true,
          menuType: 'Groups'
        },
        component: (resolve) => require(['./views/groups/index.vue'], resolve)
      },
      {
        path: ':path/activity',
        meta: {
          permission: true,
          menuType: 'Groups'
        },
        component: (resolve) => require(['./views/groups/activity.vue'], resolve)
      },
      {
        path: ':path/issues-parent',
        redirect: ':path/issues'
      },
      {
        path: ':path/issues',
        meta: {
          permission: true,
          menuType: 'Groups'
        },
        component: (resolve) => require(['./views/groups/issues.vue'], resolve)
      },
      {
        path: ':path/labels',
        meta: {
          permission: true,
          menuType: 'Groups'
        },
        component: (resolve) => require(['./views/groups/labels.vue'], resolve)
      },
      {
        path: ':path/members',
        meta: {
          permission: true,
          menuType: 'Groups'
        },
        component: (resolve) => require(['./views/groups/members.vue'], resolve)
      }
    ]
  },
  {
    path: '/:namespace/:projectPath',
    component: (resolve) => require(['./views/layout.vue'], resolve),
    children: [
      {
        path: '/',
        meta: {
          permission: true,
          menuType: 'Projects'
        },
        component: (resolve) => require(['./views/projects/index.vue'], resolve)
      },
      {
        path: 'tree',
        meta: {
          permission: true,
          menuType: 'Projects'
        },
        component: (resolve) => require(['./views/projects/index.vue'], resolve)
      },
      {
        path: 'settings',
        redirect: 'members'
      },
      {
        path: 'members',
        meta: {
          permission: true,
          menuType: 'Projects'
        },
        component: (resolve) => require(['./views/projects/members.vue'], resolve)
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
          permission: true
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
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

let dynamicRoutePath = [];

router.beforeEach(async (to, from, next) => {
  store.commit('setLoading', true);

  let code = to.path.substring(1).replace('/', '');
  if (!util.reservedWords.includes(code)
    && !dynamicRoutePath.includes(code)
    && /^\/[a-zA-Z0-9]+\/?$/.test(to.path)) {
    await store.dispatch('getCodeType', code).then(data => {
      router.addRoutes([{
        path: to.path,
        component: (resolve) => require(['./views/layout.vue'], resolve),
        children: [
          {
            path: '/',
            meta: {
              permission: true,
              menuType: data.type,
              item: data.item
            },
            component: (resolve) => require(['./views/' + data.type.toLowerCase() + '/index.vue'], resolve)
          }
        ]
      }]);

      dynamicRoutePath.push(code);
      next(to.path);
    }).catch(() => {
      next({path: '/404'});
    });
  }

  // 无需权限的界面
  if (!to.meta.permission) {
    next();
    return;
  }

  // 如果没有token，重定向到登录界面
  let token = localStorage.getItem(constants.LOCAL_TOKEN_NAME);
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
  if (to.meta.menuType === 'Admin' && store.getters.getUser.accessLevel !== 'Admin') {
    next({
      path: '/404'
    });
    return;
  }

  await util.getMenusWithNewRoute(to);

  // 鉴权成功，放行
  next();
});

router.afterEach(() => {
  store.commit('setLoading', false);
});

export default router;
export {routers};