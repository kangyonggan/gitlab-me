export default [
  {
    name: 'Group home',
    url: '/{code}',
  },
  {
    name: 'Overview',
    url: '/groups/{code}',
    icon: 'el-icon-s-home',
    children: [
      {
        name: 'Details',
        url: '/groups/{code}'
      },
      {
        name: 'Activity',
        url: '/groups/{code}/activity'
      }
    ]
  },
  {
    name: 'Issues',
    url: '/groups/{code}/issues',
    icon: 'el-icon-copy-document',
    children: [
      {
        name: 'List',
        url: '/groups/{code}/issues'
      },
      {
        name: 'Labels',
        url: '/groups/{code}/labels'
      },
      {
        name: 'Milestones',
        url: '/groups/{code}/milestones'
      }
    ]
  },
  {
    name: 'Merge Requests',
    url: '/groups/{code}/merge_requests',
    icon: 'el-icon-s-operation'
  },
  {
    name: 'Users',
    url: '/groups/{code}/users',
    icon: 'el-icon-s-custom'
  },
  {
    name: 'Settings',
    url: '/groups/{code}/settings',
    icon: 'el-icon-s-tools',
    children: [
      {
        name: 'General',
        url: '/groups/{code}/edit'
      },
      {
        name: 'Projects',
        url: '/groups/{code}/projects'
      },
      {
        name: 'CI/CD',
        url: '/groups/{code}/ci_cd'
      }
    ]
  }
];