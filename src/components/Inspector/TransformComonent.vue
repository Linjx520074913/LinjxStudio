<template>
  <div id="transform_root">
    <div class="inspector_item_title">
      <svg class="inspector_icon" aria-hidden="true"><use xlink:href="#icon-spatial"></use></svg>
      <a>Transform</a>
    </div>
    <el-collapse>
      <el-collapse-item>
        <span class="collapse-title" slot="title">Translation</span>
        <div class="vertical_layout">
          <div style="{width:100%;display:grid;grid-template-columns: 1fr 1fr 1fr;}">
            <div class="light_black">
              <div class="X">X</div>
              <el-input v-model="currentObj.position.x" placeholder=""></el-input>
            </div>
            <div class="light_black">
              <div class="Y">Y</div>
              <el-input v-model="currentObj.position.y" placeholder=""></el-input>
            </div>
            <div class="light_black">
              <div class="Z">Z</div>
              <el-input v-model="currentObj.position.z" placeholder=""></el-input>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item>
        <span class="collapse-title" slot="title">Scale</span>
        <div class="vertical_layout">
          <div style="{width:100%;display:grid;grid-template-columns: 1fr 1fr 1fr;}">
            <div class="light_black">
              <div class="X">X</div>
              <el-input v-model="currentObj.scale.x" placeholder=""></el-input>
            </div>
            <div class="light_black">
              <div class="Y">Y</div>
              <el-input v-model="currentObj.scale.y" placeholder=""></el-input>
            </div>
            <div class="light_black">
              <div class="Z">Z</div>
              <el-input v-model="currentObj.scale.z" placeholder=""></el-input>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item>
        <span class="collapse-title" slot="title">Rotation</span>
        <div class="vertical_layout">
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
    </el-collapse>
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
      // 旋转, NOTE:Object3D 中的这个属性类型是 Euler 弧度，而在属性面板上显示是 角度，所以在
      // 设置 rotation 的时候需要弧度和角度直接的转换
      rotation: new Vector3(0, 0, 0),
      currentObj: new Object3D()
    }
  },
  mounted () {
    this.$EventBus.$on('showSelectObject', (object) => {
      this.currentObj = object
      // 弧度转换为角度，用于在界面上显示
      this.rotation.set(THREE.Math.radToDeg(object.rotation.x),
                        THREE.Math.radToDeg(object.rotation.y),
                        THREE.Math.radToDeg(object.rotation.z))
    })
  },
  watch: {
    rotation: {
      handler (newValue, oldValue) {
        // 角度转换为弧度，用于对象的更新
        this.rotation.set(newValue.x, newValue.y, newValue.z)
        this.currentObj.rotation.set(THREE.Math.degToRad(newValue.x), THREE.Math.degToRad(newValue.y), THREE.Math.degToRad(newValue.z))
      },
      deep: true
    }
  }
}
</script>

<style>
</style>
