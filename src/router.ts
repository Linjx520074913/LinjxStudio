import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from './components/LoginPage.vue'
import MainWindow from './components/MainWindow.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/MainWindow',
      name: 'MainWindow',
      component: MainWindow
    }
  ]
})
