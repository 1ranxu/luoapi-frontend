export default [
    {
        path: '/user',
        layout: false,
        routes: [
            {name: '登录', path: '/user/login', component: './User/Login'},
            {
                name: '注册账号',
                path: '/user/register',
                component: './User/Register',
            },
            {
                name: '注册账号',
                path: '/user/register/:id',
                component: './User/Register',
                hideInMenu: true,
            },
        ],
    },
    {path: '/:id', name: '欢迎', icon: 'CarOutlined', component: './Welcome', hideInMenu: true,},
    // {path: '/', name: '欢迎', icon: 'CarOutlined', component: './Welcome'},
    {path: '/', name: '接口空间', icon: 'HeatMapOutlined', component: './InterfaceSquare',},
    {
        path: '/account/center', name: '个人中心', icon: 'UserOutlined', component: './User/UserInfo', hideInMenu: true,
    },
    {
        path: '/interface_info/:id',
        name: '接口详情',
        component: './InterfaceInfo',
        hideInMenu: true,
    },
    {
        path: '/admin',
        name: '管理页',
        icon: 'crown',
        access: 'canAdmin',
        routes: [
            {
                name: '接口管理',
                icon: 'ApiOutlined',
                path: '/admin/interface/list',
                component: './Admin/InterfaceInfoList',
            },
            {
                name: '用户管理',
                icon: 'TeamOutlined',
                path: '/admin/user/list',
                component: './Admin/UserList',
            },
        ],
    },
    {path: '*', layout: false, component: './404'},
];
