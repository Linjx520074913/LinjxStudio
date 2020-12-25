<template>
    <div id="title_bar_root">
        <el-image id="logo" src="/imgs/orbbec.png"></el-image>
        <MenuBar/>
        <ControlBar/>
    </div>
</template>

<script>
import MenuBar from './MenuBar'
import ControlBar from './ControlBar'

export default {
  name: 'TitleBar',
  components: {
    MenuBar,
    ControlBar
  }
}
</script>

<style>
#title_bar_root{
    display:flex;
    width:100%;
    height:100%;
    background:#1D232F;
    -webkit-app-region: drag; /* 让元素可拖动，设置了drag的元素不可点击 */
}
.el-image {
  margin-top: 4px !important;
}
#logo {
  width: 24px;
  height: 24px;
  margin-left: 10px;
}

</style>
