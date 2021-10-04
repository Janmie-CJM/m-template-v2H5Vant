const getters = {
  // user
  token: state => state.user.token,
  userName: state => state.user.userName,
  roles: state => state.user.roles,
  // home
  accessedRoutes: state => state.home.accessedRoutes,
  tabbarList: state => state.home.tabbarList

}
export default getters
