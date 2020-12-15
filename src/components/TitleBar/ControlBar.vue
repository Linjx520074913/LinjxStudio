<template>
    <div id="control_container">
        <el-tooltip class="item" effect="dark" content="该功能暂未开发" placement="top-start">
          <el-avatar :size="25" icon="el-icon-user-solid"></el-avatar>
        </el-tooltip>
        <svg class="icon" aria-hidden="true" v-on:click="minimize"> <use xlink:href="#icon-minimize"></use></svg>
        <svg class="icon" aria-hidden="true" v-on:click="maximize"> <use xlink:href="#icon-maximize"></use></svg>
        <svg class="icon" aria-hidden="true" v-on:click="close"> <use xlink:href="#icon-close"></use></svg>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'ControlBar',
  methods: {
    minimize () {
      console.log('send : 最小化窗口')
      ipcRenderer.send('minWindow')
    },
    maximize () {
      console.log('send : 最大化窗口')
      ipcRenderer.send('maxWindow')
    },
    close () {
      console.log('send : 关闭窗口')
      ipcRenderer.send('closeWindow')
    }
  }
}
</script>

<style>
#control_container{
    -webkit-app-region: no-drag;
}
#control_container > .icon{
    padding:0 5px 0 5px;
    height:100%;
    color: #FdFdFd;
}
#control_container > .icon:hover{
    background-color: #72777b88
}
</style>
