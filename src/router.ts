import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './components/LoginPage.vue'
import MainWindow from './components/MainWindow.vue'

Vue.use(Router)

/* 路由默认入口为 '/' */
export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainWindow',
      component: MainWindow
    },
    {
      path: '/LoginPage',
      name: 'LoginPage',
      component: LoginPage
    }
  ]
})
