/**
 * 页面资源集合，请不要在主进程中引用
 */

// 设为 undefined 将不会创建路由，一般用于重定向
export const Home = undefined

export const Login = import('./views/login')
export const ForgetPWD = import('./views/forget-pwd')
export const Register = import('./views/register')
export const Menu = import('./views/menu')
export const FunctionPage = import('./views/functionPage')
export const UserInfo = import('./views/userInfo')
export const Update = import('./views/update')

// 同步引用，注意这不会触发 beforeRouter
export { default as AlertModal } from './views/modals/alert-modal'
