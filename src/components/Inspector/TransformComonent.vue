<template>
  <div id="transform_root">
    <div class="inspector_item_title"  @click="expand =! expand">
      <svg class="inspector_icon" aria-hidden="true"><use xlink:href="#icon-spatial"></use></svg>
      <a>Transform</a>
    </div>
    <div class="vertical_layout"  v-show="expand">
      <div style="{width:100%;display:grid;grid-template-columns: 1fr 2fr 2fr 2fr;}">
        <a>位置</a>
        <div class="light_black">
          <div class="X">X</div>
          <el-input v-model="selectedObject.position.x" placeholder="" type="number" maxlength="5"></el-input>
        </div>
        <div class="light_black">
          <div class="Y">Y</div>
          <el-input v-model="selectedObject.position.y" placeholder="" type="number" maxlength="5"></el-input>
        </div>
        <div class="light_black">
          <div class="Z">Z</div>
          <el-input v-model="selectedObject.position.z" placeholder="" type="number" maxlength="5"></el-input>
        </div>
      </div>
      <div class="vertical_layout">
        <div style="{width:100%;display:grid;grid-template-columns: 1fr 2fr 2fr 2fr;}">
          <a>缩放</a>
          <div class="light_black">
            <div class="X">X</div>
            <el-input v-model="selectedObject.scale.x" placeholder="" type="number" maxlength="5" min="0"></el-input>
          </div>
          <div class="light_black">
            <div class="Y">Y</div>
            <el-input v-model="selectedObject.scale.y" placeholder="" type="number" maxlength="5" min="0"></el-input>
          </div>
          <div class="light_black">
            <div class="Z">Z</div>
            <el-input v-model="selectedObject.scale.z" placeholder="" type="number" maxlength="5" min="0"></el-input>
          </div>
        </div>
      </div>
      <div class="vertical_layout">
        <div style="{width:100%;display:grid;grid-template-columns: 1fr 2fr 2fr 2fr;}">
          <a>旋转</a>
          <div class="light_black">
            <div class="X">X</div>
            <el-input v-model="rotation.x" placeholder="" type="number" maxlength="5"></el-input>
          </div>
          <div class="light_black">
            <div class="Y">Y</div>
            <el-input v-model="rotation.y" placeholder="" type="number" maxlength="5"></el-input>
          </div>
          <div class="light_black">
            <div class="Z">Z</div>
            <el-input v-model="rotation.z" placeholder="" type="number" maxlength="5"></el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { Object3D, Vector3 } from 'three'
import { Euler } from 'three'
export default {
  name: 'TransformComponent',
  data () {
    return {
      rotation: new Euler(),
      expand: true
    }
  },
  props: { selectedObject: Object3D },
  methods: {
  },
  watch: {
    selectedObject: {
      immediate:true,
      handler (newValue, oldValue) {
         // 弧度转换为角度，用于在界面上显示
        this.rotation.set(
          THREE.Math.radToDeg(newValue.rotation.x),
          THREE.Math.radToDeg(newValue.rotation.y),
          THREE.Math.radToDeg(newValue.rotation.z)
        )
      }
    },
    // 旋转, NOTE:Object3D 中的这个属性类型是 Euler 弧度，而在属性面板上显示是 角度，所以在
    // 设置 rotation 的时候需要弧度和角度直接的转换
    rotation: {
      handler (newValue, oldValue) {
        // 角度转换为弧度，用于对象的更新
        this.rotation.set(newValue.x, newValue.y, newValue.z)
        this.selectedObject.rotation.set(THREE.Math.degToRad(newValue.x), THREE.Math.degToRad(newValue.y), THREE.Math.degToRad(newValue.z))
      },
      deep: true
    }
  }
}
</script>

<style>
#transform_root {
  background: #262C3B;
}
</style>
