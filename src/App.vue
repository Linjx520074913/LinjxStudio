<template>
  <div id="app">
    <MainWindow/>
  </div>
</template>

<script>
import './assets/font/iconfont.js'
import './assets/font/iconfont.css'
import MainWindow from './components/MainWindow'

export default {
  name: 'app',
  components: {
    MainWindow
  }
}
</script>

<style>
#app {

}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
