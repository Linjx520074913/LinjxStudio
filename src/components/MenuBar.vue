<template>
  <div id="menu_root">
    <ul class="menu_level_1" v-for="item in content" :key="item.index">
      <a class="menu_level_1_title">{{item.text}}</a>
      <li class="menu_level_2" v-for="child in item.menu" :key="child.index">
        <svg class="icon" v-if="'icon' in child" aria-hidden="true" style="height: 32px; margin-left: 10px; margin-right: 10px"> <use v-bind:xlink:href="child.icon"></use></svg>
        <a>{{child.text}}</a>
      </li>
    </ul>
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
          { text: '新建文件', icon: '#icon-new' },
          { text: '新建窗口', icon: '#icon-ic_ranliaojiazhu' },
          { text: '退出', icon: '#icon-exit' }
        ]
      }, {
        text: '编辑(E)',
        menu: [
          { text: '剪切', icon: '#icon-ic_wendu' },
          { text: '复制', icon: '#icon-ic_anzhuangshebei' },
          { text: '查找', icon: '#icon-ic_weixiufuwu' }
        ]
      }, {
        text: '查看(V)',
        menu: [
          { text: '外观', icon: '#icon-ic_jiazhuangshebei' },
          { text: '中端', icon: '#icon-ic_xiaoxi1' },
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
  }
}
</script>

<style>
/* 设置菜单栏元素不响应 drag 事件 */
#menu_root{
  -webkit-app-region: no-drag;
   margin-left:0px;
   margin-right:auto; /* */
}
/* 设置 float : left, 使之在一行上面 */
.menu_level_1{
  float:left;
  margin:0;
  padding:0;
  width: 65px;
  list-style-type:none; /* 去掉默认列表头样式 */
}
/*【一级菜单标签】 */
.menu_level_1_title{
  color: #72777b;
  display: block;
  height: 100%;
  user-select:none; /* 设置文本不可选择 */
}
/*【一级菜单标签】 hover 时状态 */
.menu_level_1_title:hover{
  color: #A2A7Ab;
  background-color: #343944
}
/*【二级菜单】: 字体颜色, 默认隐藏(hover 时显示)，浮于上层 */
.menu_level_2{
  color: #BBB;
  position:relative;
  float:left;
  width: 200px;
  z-index: 10;
  background-color: #171C26;
  display: none; /* 二级菜单默认隐藏 */
}
/* 【二级菜单】：hover 时改变背景颜色 */
.menu_level_2:hover{
  background-color: #1F2633;
}
/* 【一级菜单】悬停时显示 【二级菜单栏】 */
.menu_level_1:hover .menu_level_2{
  display: flex; /* 设置该属性时，li 中的元素从横向排列 */
}

</style>
