<template>
  <div id="scene_root">
    <ToolBar/>
    <!-- 通过 this.$store.state.is3D 该值控制 2D / 3D 视图的显示与隐藏 -->
    <Scene2D v-show='this.$store.state.is3D==false'/>
    <Scene3D v-show='this.$store.state.is3D'/>
  </div>
</template>

<script>
import ToolBar from './ToolBar'
import Scene2D from './Scene2D'
import Scene3D from './Scene3D'

export default {
  name: 'Preview',
  components: {
    ToolBar,
    Scene2D,
    Scene3D
  }
}
</script>

<style>
#scene_root {
  height: 100%
}
</style>
