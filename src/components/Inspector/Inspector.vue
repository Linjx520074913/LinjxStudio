<template>
  <div class="inspector_root">
    <div class="inspector_tabs">
      <div v-for="(tab, index) in tabs" :key="index" @click="selectProperty(index)" class="property_item" :style="index == selectedPropertyIndex ? 'color: #6A9DEA;' : 'color: #555555;'">
        {{ tab.name }}
      </div>
    </div>
    <div v-if='selectedObject'>
      <BasicInfoComponent :selectedObject.sync='selectedObject'/>
      <TransformComponent :selectedObject.sync='selectedObject'/>
      <div v-for="(componentName, index) in componentList" v-bind:key="index">
      <!-- 【NOTE】 : 组件切换时，通过 keep-alive 保存组件的状态 -->
        <keep-alive>
          <component :is="componentName" :selectedObject.sync='selectedObject'/>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import '../../assets/css/custom-elementui.css'
import '../../assets/css/inspector.css'
import * as THREE from 'three'
import { Euler } from 'three'
import BasicInfoComponent from './BasicInfoComponent'
import TransformComponent from './TransformComonent'
import ShadowComponent from './ShadowComponent'
import LightComponent from './LightComponent'
import MaterialComponent from './MaterialComponent'
import { Editor } from '@/main/Editor'

export default {
  name: 'Inspector',
  components: {
    BasicInfoComponent,
    TransformComponent,
    ShadowComponent,
    LightComponent,
    MaterialComponent
  },
  data() {
    return {
      editor: Editor.getInstance(),
      // 选中的物体
      selectedObject: null,
      // 要显示的面板名称
      activedComponent: '',
      componentList: [''],
      // 属性
      tabs: [
        {
          name: "属性"
        },
        {
          name: "节点"
        }
      ],
      // 选中的属性索引
      selectedPropertyIndex: 0
    }
  },
  computed: {
    activatedProperty() {
      return this.tabs[this.selectedPropertyIndex]
    }
  },
  created () {
    // 1、处理【物体选中】信号
    // 2、显示物体信息面板
    this.editor.signalManager.objectSelected.add( (object) => {
      this.selectedObject = object

      this.showSpecialComponent(this.selectedObject.type)
    })
    this.editor.signalManager.objectRemoved.add( (object) => {
      console.log('remove')
    })
  },
  methods: {
    selectProperty (index) {
      this.selectedPropertyIndex = index
    },
    changeBackground (index) {
      return this.selectedPropertyIndex == index ? '#333B4F' : '#262C3B'
    },
    // 根据物体的类型，显示具体的组件
    showSpecialComponent (type){
      // 光源类型
      if (type.includes('Light')) {
        this.componentList = ['LightComponent']
      }else {
        this.componentList = []
      }
    }
  }
}
</script>

<style scoped>
.inspector_root {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 57px);
  background: #141820;
  box-sizing: border-box;
  border-left: 1px solid #111;
}
.inspector_tabs {
  display: flex;
  height: 32px;
  text-align: center;
  line-height: 32px;
  color: #CCCED3;
  user-select: none;
}
.property_item {
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 2px;
  background: #333B4F;
}
.inspector_content {
  flex: 1;
}

</style>
