export default [
  {
    name: 'Overview',
    url: '/admin',
    icon: 'el-icon-monitor'
  },
  {
    name: 'Manage',
    url: '/admin/manage',
    icon: 'el-icon-menu',
    children: [
      {
        name: 'Users',
        url: '/admin/users'
      },
      {
        name: 'Groups',
        url: '/admin/groups'
      },
      {
        name: 'Projects',
        url: '/admin/projects'
      }
    ]
  },
  {
    name: 'Settings',
    url: '/admin/application_settings',
    icon: 'el-icon-setting'
  }
];