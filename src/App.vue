<template>
  <div id="app">
    <router-link to="/"></router-link>
    <router-view/>
  </div>
</template>

<script>
import './assets/font/iconfont.js'
import './assets/font/iconfont.css'
export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
