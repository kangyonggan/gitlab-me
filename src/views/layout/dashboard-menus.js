export default [
    {
        name: 'Projects',
        url: '/projects',
        icon: 'el-icon-s-grid',
        children: [
            {
                name: 'Your Projects',
                url: '/projects/index'
            },
            {
                name: 'Starred Projects',
                url: '/projects/starred'
            }
        ]
    },
    {
        name: 'Authentication log',
        url: '/audit_log',
        icon: 'el-icon-notebook-2'
    },
    {
        name: 'Profile',
        url: '/profile',
        icon: 'el-icon-s-custom'
    }
];