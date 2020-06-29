export default [
  {
    name: 'App Web',
    url: '/{namespace}/{projectPath}',
  },
  {
    name: 'Project overview',
    url: '/{namespace}/{projectPath}/overview',
    icon: 'el-icon-house',
    children: [
      {
        name: 'Details',
        url: '/{namespace}/{projectPath}'
      }
    ]
  },
  {
    name: 'Settings',
    url: '/{namespace}/{projectPath}/settings',
    icon: 'el-icon-s-tools',
    children: [
      {
        name: 'Members',
        url: '/{namespace}/{projectPath}/members'
      }
    ]
  }
];