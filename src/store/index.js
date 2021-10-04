import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { user, home } from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    home
  },
  getters
})

export default store
