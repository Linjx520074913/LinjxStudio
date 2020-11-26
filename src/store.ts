import { StaticReadUsage } from 'three'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    is3D: true
  },
  mutations: {
    toggle (state) {
      state.is3D = !state.is3D
    }
  },
  actions: {

  }
})
