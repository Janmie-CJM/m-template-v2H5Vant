import api from './index'
// axios
import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: api.Login,
    method: 'post',
    data
  })
}

// 用户信息
export function getUserInfo(token) {
  return request({
    url: api.UserInfo,
    method: 'get',
    params: { token }
  })
}

// 退出登录
export function logout() {
  return request({
    url: api.Logout,
    method: 'post'
  })
}
