const routes: RouteConfig[] = [
  {
    key: 'Update',
    path: '/update',
    windowOptions: {
      title: '发现更新',
      width: 410,
      height: 430,
      resizable: false,
      frame: false,
    },
    createConfig: {
      // openDevTools: true,
      // showTitlebar: false,
    },
  },
]

export default routes
