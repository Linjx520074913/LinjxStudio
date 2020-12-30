<template>
  <div class="inspector_root">
    <div class="inspector_tabs">
      <div v-for="(tab, index) in tabs" :key="index" @click="selectProperty(index)" class="property_item" :style="index == selectedPropertyIndex ? 'color: #6A9DEA;' : 'color: #555555;'">
        {{ tab.name }}
      </div>
    </div>
    <BasicInfoComponent/>
    <TransformComponent/>
    <div v-for="(componentName, index) in componentList" v-bind:key="index">
     <!-- 【NOTE】 : 组件切换时，通过 keep-alive 保存组件的状态 -->
      <keep-alive>
        <component :is="componentName"/>
      </keep-alive>
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
import { ExtSpotLight } from '../../ts/ExtSpotLight'

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
      // 要显示的面板名称
      activedComponent: '',
      // 当前面板中显示的对象
      obj: null,
      // 名字
      name: ' ',
      // 类型
      type: ' ',
      // uuid, 唯一标识 object 对象
      uuid: ' ',
      // 位置
      position: new THREE.Vector3(0, 0, 0),
      // 旋转, NOTE:Object3D 中的这个属性类型是 Euler 弧度，而在属性面板上显示是 角度，所以在
      // 设置 rotation 的时候需要弧度和角度直接的转换
      rotation: new THREE.Vector3(0, 0, 0),
      // 缩放
      scale: new THREE.Vector3(0, 0, 0),
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
  methods: {
    selectProperty (index) {
      this.selectedPropertyIndex = index
    },
    changeBackground (index) {
      return this.selectedPropertyIndex == index ? '#333B4F' : '#262C3B'
    }
  },
  mounted () {
    this.$EventBus.$on('showPanel', (object) => {
      // this.activedComponent = componentName
      this.$EventBus.$emit('showSelectObject', object)
      // this.obj = object
      // this.name = this.obj.name
      // this.type = this.obj.type
      // this.uuid = this.obj.uuid

      // this.position = this.obj.position
      // this.rotation.set(THREE.Math.radToDeg(object.rotation.x),
      //                   THREE.Math.radToDeg(object.rotation.y),
      //                   THREE.Math.radToDeg(object.rotation.z))
      // this.scale = this.obj.scale
    })
  },
  watch: {
    rotation: {
      handler (newValue, oldValue) {
        this.rotation.set(newValue.x, newValue.y, newValue.z)
        this.obj.rotation.set(THREE.Math.degToRad(newValue.x), THREE.Math.degToRad(newValue.y), THREE.Math.degToRad(newValue.z))
      },
      deep: true
    },
    // NOTE : this.name = this.obj.name， 为什么修改 this.name, thi.obj.name 不会跟着修改呢
    // 同样的操作，this.position 是会修改的？？？？？？？
    name (newValue, oldValue) {
      this.obj.name = newValue
      console.log(this.obj)
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
