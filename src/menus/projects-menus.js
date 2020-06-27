export default [
  {
    name: 'App Web',
    url: '/{namespace}/{projectPath}',
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