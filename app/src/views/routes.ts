const routes: RouteConfig[] = [
  {
    key: 'Home',
    path: '/',
    redirect: { to: '/menu?form=home' },
    windowOptions: {
      title: 'HiChat',
      width: 1200,
      height: 800,
      minWidth: 573,
      minHeight: 660,
    },
    createConfig: {
      showSidebar: true,
      saveWindowBounds: true,
      // openDevTools: true,
    },
  },
]

export default routes
