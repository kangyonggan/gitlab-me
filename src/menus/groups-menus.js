export default [
  {
    name: 'Group index',
    code: 'GROUPS_INDEX',
    url: '/{code}',
  },
  {
    name: 'Activity',
    code: 'GROUP_ACTIVITY',
    url: '/groups/{code}/activity',
    icon: 'el-icon-data-line'
  },
  {
    name: 'Issues',
    code: 'GROUP_ISSUES',
    url: '/groups/{code}/issues-parent',
    icon: 'el-icon-copy-document',
    children: [
      {
        name: 'List',
        code: 'GROUP_ISSUES_LIST',
        url: '/groups/{code}/issues'
      },
      {
        name: 'Labels',
        code: 'GROUP_ISSUES_LABELS',
        url: '/groups/{code}/labels'
      },
      {
        name: 'Milestones',
        code: 'GROUP_ISSUES_MILESTONES',
        url: '/groups/{code}/milestones'
      }
    ]
  },
  {
    name: 'Merge Requests',
    code: 'GROUP_MERGE_REQUESTS',
    url: '/groups/{code}/merge_requests',
    icon: 'el-icon-s-operation'
  },
  {
    name: 'Members',
    code: 'GROUP_MEMBERS',
    url: '/groups/{code}/members',
    icon: 'el-icon-s-custom'
  },
  {
    name: 'Settings',
    code: 'GROUP_SETTINGS',
    url: '/groups/{code}/settings',
    icon: 'el-icon-s-tools',
    children: [
      {
        name: 'General',
        code: 'GROUP_GENERAL',
        url: '/groups/{code}/edit'
      },
      {
        name: 'Projects',
        code: 'GROUP_PROJECTS',
        url: '/groups/{code}/projects'
      },
      {
        name: 'CI/CD',
        code: 'GROUP_CI_CD',
        url: '/groups/{code}/ci_cd'
      }
    ]
  }
];