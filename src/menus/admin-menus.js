export default [
  {
    name: 'Admin Area',
    code: 'ADMIN_AREA',
    url: '/admin',
    icon: 'el-icon-monitor'
  },
  {
    name: 'Overview',
    code: 'ADMIN_OVERVIEW',
    url: '/admin/overview',
    icon: 'el-icon-menu',
    children: [
      {
        name: 'Users',
        code: 'ADMIN_OVERVIEW_USERS',
        url: '/admin/users'
      },
      {
        name: 'Groups',
        code: 'ADMIN_OVERVIEW_GROUPS',
        url: '/admin/groups'
      },
      {
        name: 'Projects',
        code: 'ADMIN_OVERVIEW_PROJECTS',
        url: '/admin/projects'
      }
    ]
  },
  {
    name: 'Settings',
    code: 'ADMIN_APPLICATION_SETTINGS',
    url: '/admin/application_settings',
    icon: 'el-icon-setting'
  }
];