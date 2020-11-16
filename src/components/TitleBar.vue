<template>
    <div id="title_bar">
        <el-button-group id="test">
            <i class="el-icon-minus" v-on:click="minimize"></i>
            <i class="el-icon-minus" v-on:click="maximize"></i>
            <i class="el-icon-close" v-on:click="close"></i>
        </el-button-group>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'TitleBar',
  methods: {
    minimize () {
      console.log('最小化窗口')
      ipcRenderer.send('minWindow')
    },
    maximize () {
      console.log('最大化窗口')
      ipcRenderer.send('maxWindow')
    },
    close () {
      console.log('关闭窗口')
      ipcRenderer.send('closeWindow')
    }
  }
}
</script>

<style>
#title_bar{
    width:100%;
    height:40px;
    background:#00ff00;
    -webkit-app-region: drag; /* 让元素可拖动，设置了drag的元素不可点击 */
}
#test{
     display:flex;
     float:right;
     height:100%;
     align-items:center;/*指定垂直居中*/
     -webkit-app-region: no-drag;
}
</style>
