/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    meta: { title: '登录', roles: ['admin'] }
  },
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        menuType: 1,
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false, icon: 'home-o', roles: ['admin'] }
      },
      {
        path: '/about',
        name: 'About',
        menuType: 1,
        component: () => import('@/views/home/about'),
        meta: { title: '关于我', keepAlive: false, icon: 'user-o', roles: ['admin'] }
      }
    ]
  }
]
