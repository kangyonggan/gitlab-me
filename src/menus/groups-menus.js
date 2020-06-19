export default [
  {
    name: 'Group home',
    url: '/{code}',
  },
  {
    name: 'Activity',
    url: '/groups/{code}/activity',
    icon: 'el-icon-data-line'
  },
  {
    name: 'Issues',
    url: '/groups/{code}/issues-parent',
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
    name: 'Members',
    url: '/groups/{code}/members',
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