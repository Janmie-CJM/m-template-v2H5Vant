import { constantRouterMap } from '@/router/router.config.js'

// function——判断对应路由在该roles下是否有权访问
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

// function——过滤roles中可访问的路由
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

// funtion——过滤menutype为1的tabbarlist
export function filterTabbatList(inputList, outputList = []) {
  inputList.forEach(r => {
    if (r.menuType && r.menuType == 1) {
      outputList.push(r)
    }
    if (r.children) {
      filterTabbatList(r.children, outputList)
    }
  })
  return outputList
}

const state = {
  accessedRoutes: [],
  tabbarList: []
}
const mutations = {
  SET_ACCESSED_ROUTES: (state, accessedRoutes) => {
    state.accessedRoutes = accessedRoutes
  },
  SET_TABBAR_LIST: (state, tabbarList) => {
    state.tabbarList = tabbarList
  }
}
const actions = {
  // 根据roles生成对应路由
  generateRoutes({ commit, state }, roles) {
    return new Promise(resolve => {
      let accessedRoutes

      if (roles.includes('admin')) {
        accessedRoutes = constantRouterMap || []
      } else {
        accessedRoutes = filterAsyncRoutes(constantRouterMap, roles)
      }

      const tabbarList = filterTabbatList(accessedRoutes)

      commit('SET_ACCESSED_ROUTES', accessedRoutes)
      commit('SET_TABBAR_LIST', tabbarList)
      resolve(accessedRoutes)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
