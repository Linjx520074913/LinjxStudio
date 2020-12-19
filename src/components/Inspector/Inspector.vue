<template>
  <section class="inspector_root">
    <div class="inspector_tabs">
      <div v-for="(tab, index) in tabs" :key="index" @click="selectProperty(index)" class="property_item" :style="index == selectedPropertyIndex ? 'color: #6A9DEA;' : 'color: #555555;'">
        {{ tab.name }}
      </div>
    </div>
    <div class="inspector_content">
      <div class="detail">
        <div>
          <div class="inspector_item_title">
            <a>基础属性</a>
          </div>
          <div class="common_property">
            <a>类型</a>
            <a>{{type}}</a>
            <a>名字</a>
            <el-input v-model="name" placeholder=""></el-input>
            <a>UUID</a>
            <a style="overflow:hidden;text-overflow:ellipsis;">{{uuid}}</a>
          </div>
          <div class="inspector_item_title">
            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-spatial"></use></svg>
            <a>Spatial</a>
          </div>
          <el-collapse>
            <el-collapse-item>
              <span class="collapse-title" slot="title">Transform</span>
              <div class="vertical_layout">
                <a>Translation</a>
                <div style="{width:100%;display:grid;grid-template-columns: 1fr 1fr 1fr;}">
                  <div class="light_black">
                    <div class="X">X</div>
                    <el-input v-model="position.x" placeholder=""></el-input>
                  </div>
                  <div class="light_black">
                    <div class="Y">Y</div>
                    <el-input v-model="position.y" placeholder=""></el-input>
                  </div>
                  <div class="light_black">
                    <div class="Z">Z</div>
                    <el-input v-model="position.z" placeholder=""></el-input>
                  </div>
                </div>
              </div>
              <div class="vertical_layout">
                <a>Scale</a>
                <div style="{width:100%;display:grid;grid-template-columns: 1fr 1fr 1fr;}">
                  <div class="light_black">
                    <div class="X">X</div>
                    <el-input v-model="scale.x" placeholder=""></el-input>
                  </div>
                  <div class="light_black">
                    <div class="Y">Y</div>
                    <el-input v-model="scale.y" placeholder=""></el-input>
                  </div>
                  <div class="light_black">
                    <div class="Z">Z</div>
                    <el-input v-model="scale.z" placeholder=""></el-input>
                  </div>
                </div>
              </div>
              <div class="vertical_layout">
                <a>Rotation(How to use?TBD)</a>
                <div style="{width:100%;display:grid;grid-template-columns: 1fr 1fr 1fr;}">
                  <div class="light_black">
                    <div class="X">X</div>
                    <el-input v-model="rotation.x" placeholder=""></el-input>
                  </div>
                  <div class="light_black">
                    <div class="Y">Y</div>
                    <el-input v-model="rotation.y" placeholder=""></el-input>
                  </div>
                  <div class="light_black">
                    <div class="Z">Z</div>
                    <el-input v-model="rotation.z" placeholder=""></el-input>
                  </div>
                </div>
              </div>
            </el-collapse-item>
            <el-collapse-item>
              <span class="collapse-title" slot="title">Matrix</span>
              <div class="grid">
                <el-checkbox v-model="isVisible">Visible</el-checkbox>
                <el-checkbox v-model="isHelperVisible">Helper</el-checkbox>
                <a>2</a>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <!-- 【NOTE】 : 组件切换时，通过 keep-alive 保存组件的状态 -->
        <keep-alive>
          <component :is="activedComponent"/>
        </keep-alive>
      </div>
    </div>
  </section>
</template>

<script>
import '../../assets/css/custom-elementui.css'
import '../../assets/css/inspector.css'
import * as THREE from 'three'
import { Euler } from 'three'
import LightPanel from './LightPanel'
import { ExtSpotLight } from '../../ts/ExtSpotLight'

export default {
  name: 'Inspector',
  components: {
    LightPanel
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
      isVisible: true,
      isHelperVisible: true,
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
    this.$EventBus.$on('showPanel', (componentName, object) => {
      this.activedComponent = componentName
      this.obj = object
      this.name = this.obj.name
      this.type = this.obj.type
      this.uuid = this.obj.uuid

      this.position = this.obj.position
      this.rotation.set(THREE.Math.radToDeg(object.rotation.x),
                        THREE.Math.radToDeg(object.rotation.y),
                        THREE.Math.radToDeg(object.rotation.z))
      this.scale = this.obj.scale
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
.detail {
  margin: 5px;
  display: flex;
  flex-direction: column;
  border: 1px solid #666;
  height: auto
}
/* 通用属性栏 */
.common_property {
  /* 网格行自动扩展 */
  display: grid;
  grid-template-columns: 40% 60%;
  grid-auto-rows: initial;
  background: #262C3B
}
/* 设置图标大小 */
.icon {
  width: 30px;
  height: 100%
}
</style>
