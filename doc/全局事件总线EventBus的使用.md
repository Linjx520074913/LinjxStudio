- 在 main.ts 中注册全局事件总线

``` TypeScript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
Vue.config.productionTip = false
// 全局事件总线
Vue.prototype.$EventBus = new Vue() // 全局事件总线

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

- 发送事件

``` TypeScript
this.$EventBus.$emit('functionName', params)
```

- 接受事件

``` TypeScript
this.$EventBus.$on('functionName', (params) => {})
```
