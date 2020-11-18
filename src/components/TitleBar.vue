<template>
    <div id="title_bar">
        <el-image id="logo" src="/imgs/orbbec.png"></el-image>
        <div id="menu_container">
         <ul><a>文件(F)</a>
            <li><a>新建文件</a></li>
            <li><a>新建窗口</a></li>
            <li><a>退出</a></li>
         </ul>
         <ul><a>编辑(E)</a>
            <li><a>剪切</a></li>
            <li><a>复制</a></li>
            <li><a>查找</a></li>
         </ul>
         <ul><a>查看(V)</a>
            <li><a>外观</a></li>
            <li><a>中端</a></li>
            <li><a>切换自动换行</a></li>
         </ul>
         <ul><a>帮助(H)</a>
            <li><a>文档</a></li>
            <li><a>查看许可证</a></li>
            <li><a>关于</a></li>
          </ul>
        </div>
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
    display:flex;
    width:100%;
    height:100%;
    background:#1d232f;
    -webkit-app-region: drag; /* 让元素可拖动，设置了drag的元素不可点击 */
}
#menu_container{
  -webkit-app-region: no-drag;
}
#logo{
  height: 32px;
  width: 32px;
  margin-right: 10px; /* 设置图标与右边元素的距离 */
}
/* 设置 float : left, 使之在一行上面 */
#menu_container > ul{
  float:left;
  margin:0;
  padding:0;
  width: 80px;
  list-style-type:none; /* 去掉默认列表头样式 */
}
/* 设置 z-index，使之在其他元素上层显示 */
#menu_container > ul > li{
  position:relative;
  float:none;
  width: 120px;
  z-index: 10;
  background-color: #000;
  display: none; /* 二级菜单默认隐藏 */
}
/* 一级菜单栏悬停时显示二级菜单栏 */
#menu_container > ul:hover > li{
  display: block;
}
/* 菜单栏下 a 标签属性 */
#menu_container a{
  color: white;
  display: block;
  height: 100%;
}
/* 菜单栏下 a 标签 hover 时状态 */
#menu_container a:hover{
  background-color: #F90
}

</style>
