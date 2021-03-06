import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  },
  state: {
    // 是否显示 3D 视图
    is3D: true,
    // 是否显示网格
    showGrid: true,
    // 是否显示坐标轴
    showAxes: true,
    // 是否显示 4 视图
    show4Views: true,
    // 是否显示控制台视图
    showConsole: true,
    // 是否显示侧边栏
    showSliderBar: true,
    // 是否显示属性栏
    showInspector: true
  },
  mutations: {
    // 切换 2D / 3D 视图
    toggle (state) {
      state.is3D = !state.is3D
    },
    // 显示 / 隐藏网格
    showGrid (state) {
      state.showGrid = !state.showGrid
    },
    showAxes (state) {
      state.showAxes = !state.showAxes
    },
    toggleViews (state) {
      state.show4Views = !state.show4Views
    },
    toggleConsole (state) {
      state.showConsole = !state.showConsole
    },
    toggleSliderBar (state) {
      state.showSliderBar = !state.showSliderBar
    },
    toggleInspector (state) {
      state.showInspector = !state.showInspector
    }
  },
  actions: {

  }
})
