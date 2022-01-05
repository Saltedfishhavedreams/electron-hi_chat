/**
 * 路由钩子,页面切切换时触发
 * @param props
 * @param next 继续渲染
 * @this AppRouter
 */
export function beforeRouter(props: PageProps, next: () => void): boolean | void | Promise<boolean | void> {
  const pathname = props.location.pathname
  if (
    !$store.getState().userInfo['token'] &&
    pathname !== '/login' &&
    pathname !== '/forget_pwd' &&
    pathname !== '/register' &&
    pathname !== '/update'
  ) {
    props.closeWindow()
    $tools.createWindow('Login')
    return
  }
  window.dispatchEvent(new CustomEvent('router-update', { detail: props }))
  next()
}
