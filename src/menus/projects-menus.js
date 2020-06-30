export default [
  {
    name: 'Project name',
    code: 'PROJECT_NAME',
    url: '/{namespace}/{projectPath}',
  },
  {
    name: 'Project overview',
    code: 'PROJECT_OVERVIEW',
    url: '/{namespace}/{projectPath}/overview',
    icon: 'el-icon-house',
    children: [
      {
        name: 'Details',
        code: 'PROJECT_OVERVIEW_DETAIL',
        url: '/{namespace}/{projectPath}'
      }
    ]
  },
  {
    name: 'Repository',
    code: 'PROJECT_REPOSITORY',
    url: '/{namespace}/{projectPath}/repository',
    icon: 'el-icon-coin',
    children: [
      {
        name: 'Files',
        code: 'PROJECT_REPOSITORY_FILES',
        url: '/{namespace}/{projectPath}/tree/master'
      }
    ]
  },
  {
    name: 'Settings',
    code: 'PROJECT_SETTINGS',
    url: '/{namespace}/{projectPath}/settings',
    icon: 'el-icon-s-tools',
    children: [
      {
        name: 'Members',
        code: 'PROJECT_SETTINGS_MEMBERS',
        url: '/{namespace}/{projectPath}/members'
      }
    ]
  }
];