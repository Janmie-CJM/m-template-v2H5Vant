import { getToken, setToken, removeToken } from '@/utils/auth.js'
import { login, getUserInfo, logout } from 'api/user.js'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  userName: '',
  roles: []
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  SET_ROLES(state, roles) {
    state.roles = roles
  }
}
const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { userName, password } = userInfo

    return new Promise((resolve, reject) => {
      login({ userName: userName.trim(), password: password })
        .then(response => {
          const token = response.data.token
          commit('SET_TOKEN', token) // 通过mutations更改state中token值，保存token值
          setToken(token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // getUserInfo——携带toke获取用户信息
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo(state.token)
        .then(response => {
          const { data } = response

          if (!data) {
            reject('token失效，请重新登录.')
          }

          const { name, roles } = data

          if (!roles || roles.length <= 0) {
            reject('getUserInfo：roles必须为非空数组！')
          }

          commit('SET_USER_NAME', name)
          commit('SET_ROLES', roles)
          resolve(data) // 注意这里返回data，因为后续可以直接去data里面的roles。在router.beforeEach用到了
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // logout————清空vuex中的token / cookie移除token / router重置路由
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])

          removeToken()
          resetRouter()
          localStorage.clear()

          window.location.reload(true) // 退出登录时强制刷新整个界面，避免重新登录后还保留上个用户的侧边栏信息

          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // resetToken——设置vuex中token为空，cookie中的cookie也移除
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
