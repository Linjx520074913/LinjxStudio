<template>
  <div id="menu_root">
    <a class="menu_level_1" v-for="item in content" :key="item.index" @click="toggleMenu2Active()">
      <a class="menu_level_1_title">{{item.text}}</a>
      <div v-if="isMenu2Active">
        <div class="menu_level_2" v-for="child in item.menu" :key="child.index" @click="'click' in child && child.click()">
          <div id="menu_level_2_title">
            <svg class="icon" aria-hidden="true" style="height: 30px; margin-left: 10px; margin-right: 10px"> <use v-if="(('icon' in child) && ((('isActived' in child) && child.isActived())) || !('isActived' in child))" v-bind:xlink:href="child.icon"></use></svg>
            <a >{{child.text}}</a>
            <div class="arrow_right">
              <svg class="icon" v-show="'menu' in child" aria-hidden="true" style="height: 30px; margin-left: 10px; margin-right: 10px"> <use xlink:href="#icon-arrow-right"></use></svg>
            </div>
          </div>
          <div class="menu_level_3">
            <div class="menu_level_3_title" v-for="submenu in child.menu" :key="submenu.index" @click="'click' in submenu && submenu.click()">
              <svg class="icon" v-if="'icon' in submenu" aria-hidden="true" style="height: 30px; margin-left: 10px; margin-right: 10px"> <use v-bind:xlink:href="submenu.icon"></use></svg>
              <a>{{ submenu.text }}</a>
            </div>
          </div>
        </div>
      </div>
    </a>
    <el-dialog :visible.sync="popupVisible" id="popup_dialog" :show-close="false">
      <component :is="popupComponent"/>
    </el-dialog>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

import About from '../Popup/About'
import License from '../License'
import { Action } from '../../main/Action'

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
              // }).then(files => {
              //   if (files) {
              //     console.log(files)
              //   }
              //   // this.$EventBus.$emit('openModel', file, result.filePaths[0])
              // })
            },
            // 添加该属性，在渲染的时候就会多出一个 input 标签供选择文件
            type: 'upload'
          },
          {
            text: '新建窗口',
            icon: '#icon-ic_ranliaojiazhu',
            click: () => {}
          },
          {
            text: '退出',
            icon: '#icon-exit',
            click: () => { ipcRenderer.send('closeWindow') }
          }
        ]
      }, {
        text: '物体(O)',
        menu: [
          // {
          //   text: '组',
          //   icon: '#icon-ic_wendu',
          //   click: () => { console.log('aaaaaaa') }
          // },
          // {
          //   text: '基本几何物体',
          //   icon: '#icon-ic_wendu',
          //   menu: [
          //     {
          //       text: '平面',
          //       icon: '#icon-ic_wendu',
          //       click: () => {}
          //     },
          //     {
          //       text: '正方形',
          //       icon: '#icon-ic_wendu',
          //       click: () => {}
          //     },
          //     {
          //       text: '圆',
          //       icon: '#icon-ic_wendu',
          //       click: () => {}
          //     },
          //     {
          //       text: '圆柱',
          //       icon: '#icon-ic_wendu',
          //       click: () => {}
          //     },
          //     {
          //       text: '球体',
          //       icon: '#icon-ic_wendu',
          //       click: () => {}
          //     }
          //   ]
          // },
          {
            text: '相机',
            icon: '#icon-ic_wendu',
            menu: [
              {
                text: '正交相机',
                icon: '#icon-ic_wendu',
                click: () => { ipcRenderer.send(Action.CREATE_ORTHORGAPHIC_CAMERA) }
              },
              {
                text: '透视相机',
                icon: '#icon-ic_wendu',
                click: () => { ipcRenderer.send(Action.CREATE_PERSPECTIVE_CAMERA) }
              }
            ]
          },
          {
            text: '光源',
            icon: '#icon-ic_wendu',
            menu: [
              {
                text: '环境光',
                icon: '#icon-ambientlight',
                click: () => { ipcRenderer.send('createAmbientLight') }
              },
              {
                text: '平行光',
                icon: '#icon-ic_wendu',
                click: () => { ipcRenderer.send('createDirectionalLight') }
              },
              {
                text: '半球光',
                icon: '#icon-ic_wendu',
                click: () => { ipcRenderer.send('createHemisphereLight') }
              },
              {
                text: '点光源',
                icon: '#icon-pointlight',
                click: () => { ipcRenderer.send('createPointLight') }
              },
              {
                text: '平面光',
                icon: '#icon-ic_wendu',
                click: () => { ipcRenderer.send('createRectAreaLight') }
              },
              {
                text: '聚光灯',
                icon: '#icon-spotlight',
                click: () => { ipcRenderer.send('createSpotLight') }
              }
            ]
          },
          // {
          //   text: '文字',
          //   icon: '#icon-ic_wendu',
          //   click: () => {}
          // },
          // {
          //   text: '曲线',
          //   icon: '#icon-ic_wendu',
          //   click: () => {}
          // },
          // {
          //   text: '标注',
          //   icon: '#icon-ic_wendu',
          //   click: () => {}
          // },
          // {
          //   text: '帮助器',
          //   icon: '#icon-ic_wendu',
          //   click: () => {}
          // },
          // {
          //   text: '精灵',
          //   icon: '#icon-ic_wendu',
          //   click: () => {}
          // }
        ]
      }, {
        text: '编辑(E)',
        menu: [
          {
            text: '人像',
            icon: '#icon-ic_wendu',
            click: () => {
              console.log('[剪切] 被点击')
              this.$EventBus.$emit('loadModel', 'models/Zaghetto.pcd', 'Zaghetto.pcd')
            }
          },
          {
            text: '树',
            icon: '#icon-ic_anzhuangshebei',
            click: () => {
              console.log('[复制] 被点击')
              this.$EventBus.$emit('loadModel', 'models/obj/tree.obj', 'tree.obj')
            }
          },
          {
            text: 'elf.dae',
            icon: '#icon-ic_wendu',
            click: () => {
              this.$EventBus.$emit('loadModel', 'models/collada/elf/elf.dae', 'elf.dae')
            }
          },
          {
            text: '添加聚光灯',
            icon: '#icon-ic_wendu',
            click: () => {
              this.$EventBus.$emit('addSpotLight')
            }
          }
        ]
      }, {
        text: '视图(V)',
        menu: [
          {
            text:'调试控制台',
            icon: '#icon-actived',
            click: () => {
              // 是否显示 console 窗口
              this.$store.commit('toggleConsole')
            },
            isActived: () => {
              return this.$store.state.showConsole
            }
          },
          {
            text: '侧边栏',
            icon: '#icon-actived',
            click: () => {
              // 是否显示 SliderBar 窗口
              this.$store.commit('toggleSliderBar')
            },
            isActived: () => {
              return this.$store.state.showSliderBar
            }
          },
          {
            text: '属性栏',
            icon: '#icon-actived',
            click: () => {
              this.$store.commit('toggleInspector')
            },
            isActived: () => {
              return this.$store.state.showInspector
            }
          }
        ]
      }, {
        text: '帮助(H)',
        menu: [
          {
            text: '文档',
            icon: '#icon-ic_xiaoxi1'
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
            // click: () => {
            //   this.popupVisible = true
            //   this.popupComponent = 'About'
            //   console.log('[关于] 被点击')
            // }
          }
        ]
      }
      ],
      popupVisible: false,
      popupComponent: '',
      isMenu2Active: false
    }
  },
  methods: {
    handleChange (file, fileList) {
      this.$EventBus.$emit('openModel', file.raw)
    },
    toggleMenu2Active () {
      this.isMenu2Active = !this.isMenu2Active
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
   display: flex;
   flex-direction: row;
}
.menu_level_1{
  margin:0;
  padding:0;
  width: 65px;
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
  position: relative;
  float:left;
  height: 30px;
  width: 200px;
  z-index: 10;
  background-color: #171C26;
  display: none; /* 二级菜单默认隐藏 */
  user-select: none
}
#menu_level_2_title {
  display: flex;
  width: 100%;
  flex-direction: row;
}
.arrow_right {
  flex: 1;
  text-align: right;
}
.menu_level_3 {
  display: none;
  float: left;
  flex-direction: column;
  position: absolute;
  left: 100%;
  top: 0px;
  width: 200px;
  color: #BBB;
  background-color: #171C26;
}
/*【二级菜单】：点击时隐藏
.menu_level_1 .menu_level_2:active{
  display: none
}
*/
/* 【一级菜单】悬停时显示 【二级菜单栏】 */
.menu_level_1:hover .menu_level_2{
  display: flex; /* 设置该属性时，li 中的元素从横向排列 */
}
/* 【二级菜单】：hover 时改变背景颜色 */
.menu_level_1 .menu_level_2:hover{
  background-color: #1F2633;
}
.menu_level_2:hover .menu_level_3{
  display: flex;
}
.menu_level_3_title {
  display: flex;
  width: 100%;
  flex-direction: row;
}
.menu_level_3_title:hover {
  background: #1F2633;
}

/* el-dialog 弹窗默认为白色背景，此为修改弹窗样式 */
.el-dialog__header {
  background-color: #202531
}
.el-dialog__body {
  background-color: #202531
}
</style>
