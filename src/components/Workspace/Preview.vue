<template>
  <div id="scene_root">
    <ToolBar id="toolbar"/>
    <!-- 通过 this.$store.state.is3D 该值控制 2D / 3D 视图的显示与隐藏 -->
    <Scene2D id="twod" v-show='this.$store.state.is3D==false'/>
    <Scene3D id="threed" v-show='this.$store.state.is3D'/>
    <Console id="logviewer" ref='logviewer' v-show="this.$store.state.showConsole"/>
  </div>
</template>

<script>
import ToolBar from './ToolBar'
import Scene2D from './Scene2D'
import Scene3D from './Scene3D'
import Console from './Console'

export default {
  name: 'Preview',
  components: {
    ToolBar,
    Scene2D,
    Scene3D,
    Console
  },
  mounted () {
  }
}
</script>

<style>
#scene_root {
  display: flex;
  flex-direction: column;
  height: 100%;
}
#toolbar {
  flex: 0 0 1;
}
#twod, #threed {
  width: 100%;
  flex: 1
}
#logviewer {
  width: 100%;
  flex: 0 0 150px
}
</style>
