<template>
  <div id="scene_root">
    <ToolBar/>
    <!-- 通过 this.$store.state.is3D 该值控制 2D / 3D 视图的显示与隐藏 -->
    <Scene2D id="twod" v-show='this.$store.state.is3D==false'/>
    <Scene3D id="threed" v-show='this.$store.state.is3D'/>
    <LogViewer id="logviewer" />
  </div>
</template>

<script>
import ToolBar from './ToolBar'
import Scene2D from './Scene2D'
import Scene3D from './Scene3D'
import LogViewer from './LogViewer'

export default {
  name: 'Preview',
  components: {
    ToolBar,
    Scene2D,
    Scene3D,
    LogViewer
  }
}
</script>

<style>
#scene_root {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 57px);
}
#twod, #threed {
  width: 100%;
  height: calc(100vh - 287px);
}
#logviewer {
  width: 100%;
  height: 200px
}
</style>
