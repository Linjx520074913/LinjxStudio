<template>
    <div id="title_bar">
        <el-image id="logo" src="/imgs/orbbec.png"></el-image>
        <MenuBar/>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import MenuBar from './MenuBar'

export default {
  name: 'TitleBar',
  components: {
    MenuBar
  }
}
</script>

<style>
MenuBar{
  float:left
}
#title_bar{
    display:flex;
    width:100%;
    height:100%;
    background:#1d232f;
    -webkit-app-region: drag; /* 让元素可拖动，设置了drag的元素不可点击 */
}
#logo{
  height: 32px;
  width: 32px;
  margin-right: 10px; /* 设置图标与右边元素的距离 */
}

</style>
