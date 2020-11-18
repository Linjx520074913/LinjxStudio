<template>
  <div id="menu_container">
    <ul v-for="item in content" :key="item.index">
      <a>{{item.text}}</a>
      <li v-for="child in item.menu" :key="child.index">
        <a>{{child.text}}</a>
      </li>
    </ul>
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
  name: 'MenuBar',
  data () {
    return {
      content: [{
        text: '文件(F)',
        menu: [
          { text: '新建文件' },
          { text: '新建窗口' },
          { text: '退出' }
        ]
      }, {
        text: '编辑(E)',
        menu: [
          { text: '剪切' },
          { text: '复制' },
          { text: '查找' }
        ]
      }, {
        text: '查看(V)',
        menu: [
          { text: '外观' },
          { text: '中端' },
          { text: '切换自动换行' }
        ]
      }, {
        text: '帮助(H)',
        menu: [
          { text: '文档' },
          { text: '查看许可证' },
          { text: '关于' }
        ]
      }
      ]
    }
  },
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
/* 设置菜单栏元素不响应 drag 事件 */
#menu_container{
  -webkit-app-region: no-drag;
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
  width: 200px;
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
  user-select:none; /* 设置文本不可选择 */
}
/* 菜单栏下 a 标签 hover 时状态 */
#menu_container a:hover{
  background-color: #F90
}
</style>
