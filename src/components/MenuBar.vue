<template>
  <div id="menu_root">
    <ul class="menu_level_1" v-for="item in content" :key="item.index">
      <a class="menu_level_1_title">{{item.text}}</a>
      <li class="menu_level_2" v-for="child in item.menu" :key="child.index" @click="child.click()">
        <svg class="icon" v-if="'icon' in child" aria-hidden="true" style="height: 32px; margin-left: 10px; margin-right: 10px"> <use v-bind:xlink:href="child.icon"></use></svg>
      <span v-if="'type' in child && child.type == 'upload'">
        <el-upload
          class="upload-demo"
          :show-file-list="false"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          style="{cursor: pointer;}">
          {{child.text}}
        </el-upload>
      </span>
      <a v-else>{{child.text}}</a>
      </li>
    </ul>
    <el-dialog :visible.sync="popupVisible">
      <component :is="popupComponent"/>
    </el-dialog>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

import About from './About'
import License from './License'

const { dialog } = require('electron').remote

export default {
  name: 'MenuBar',
  components: {
    About,
    License
  },
  data () {
    return {
      content: [{
        text: '文件(F)',
        menu: [
          {
            text: '打开',
            icon: '#icon-new',
            click: () => {
              this.popupVisible = false
              this.popupComponent = ''
              console.log('[打开] 被点击')
              // var files = dialog.showOpenDialog({
              //   title: '模型导入',
              //   defaultPath: 'E:\\Practice\\electron-vue\\studio\\public\\models',
              //   properties: ['openFile'],
              //   filters: [
              //     { name: 'Models', extensions: ['ply', 'obj', 'pcd'] }
              //   ]
              // }).then(result => {
              //   console.log(result)
              //   // this.$EventBus.$emit('openModel', file, result.filePaths[0])
              // })
            },
            type: 'upload'
          },
          {
            text: '新建窗口',
            icon: '#icon-ic_ranliaojiazhu',
            click: () => {
              this.popupVisible = true
              console.log('[新建窗口] 被点击')
            }
          },
          {
            text: '退出',
            icon: '#icon-exit',
            click: () => { ipcRenderer.send('closeWindow') }
          }
        ]
      }, {
        text: '编辑(E)',
        menu: [
          {
            text: '剪切',
            icon: '#icon-ic_wendu',
            click: () => { console.log('[剪切] 被点击') }
          },
          {
            text: '复制',
            icon: '#icon-ic_anzhuangshebei',
            click: () => { console.log('[复制] 被点击') }
          },
          {
            text: '查找',
            icon: '#icon-ic_weixiufuwu',
            click: () => { console.log('[查找] 被点击') }
          }
        ]
      }, {
        text: '查看(V)',
        menu: [
          {
            text: '外观',
            icon: '#icon-ic_jiazhuangshebei',
            click: () => { console.log('[外观] 被点击') }
          },
          {
            text: '中端',
            icon: '#icon-ic_xiaoxi1',
            click: () => { console.log('[中端] 被点击') }
          },
          {
            text: '切换自动换行',
            icon: '#icon-ic_xiaoxi1',
            click: () => { console.log('[切换自动换行] 被点击') }
          }
        ]
      }, {
        text: '帮助(H)',
        menu: [
          {
            text: '文档',
            icon: '#icon-ic_xiaoxi1',
            click: () => { console.log('[文档] 被点击') }
          },
          {
            text: '查看许可证',
            icon: '#icon-ic_xiaoxi1',
            click: () => {
              this.popupVisible = true
              this.popupComponent = 'License'
              console.log('[查看许可证] 被点击')
            }
          },
          {
            text: '关于',
            icon: '#icon-ic_xiaoxi1',
            click: () => {
              this.popupVisible = true
              this.popupComponent = 'About'
              console.log('[关于] 被点击')
            }
          }
        ]
      }
      ],
      popupVisible: false,
      popupComponent: ''
    }
  },
  methods: {
    handleChange (file, fileList) {
      this.$EventBus.$emit('openModel', file.raw)
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
  user-select: none
}
/* 【二级菜单】：hover 时改变背景颜色 */
.menu_level_2:hover{
  background-color: #1F2633;
}
.menu_level_2:active{
  display: none;
}
/* 【一级菜单】悬停时显示 【二级菜单栏】 */
.menu_level_1:hover .menu_level_2{
  display: flex; /* 设置该属性时，li 中的元素从横向排列 */
}
.upload-demo {
  float:left;
}
</style>
