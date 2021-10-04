import router from '@/router'
import { Toast } from 'vant'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from '@/store'
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { constantRouterMap } from '@/router/router.config.js'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

// 判断是否有token，判断to.path是否在白名单中。
router.beforeEach(async(to, from, next) => {
  NProgress.start()

  document.title = getPageTitle(to.meta.title) // 设置pagetitle

  const hasToken = getToken() // 判断用户是否已经登录

  if (hasToken) {
    if (to.path === '/login') {
      // next()
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          await store.dispatch('user/getUserInfo')
          // 根据 roles 生成权限路由
          const accessedRutes = await store.dispatch('home/generateRoutes', store.getters.roles)
          router.addRoutes(accessedRutes)

          // router.addRoutes(constantRouterMap)

          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          Toast.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

