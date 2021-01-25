<template>
  <div id="light_root">
    <div class="inspector_item_title" @click="expand =! expand">
      <a>Light</a>
    </div>
    <div class="row_auto_extend_grid" v-show="expand">
      <a>color</a>
      <el-color-picker v-model="color" @active-change="changeColor"/>
      <a>intensity</a>
      <el-input v-model="selectedObject.intensity" placeholder="" type="number" min="0" max="2" step="0.1"/>
    </div>
    <div class="row_auto_extend_grid" v-show="isSpotLight()">
      <a>distance</a>
      <el-input v-model="selectedObject.distance" placeholder="" type="number" min="0" step="5"/>
      <a>angle</a>
      <el-input v-model="angle" placeholder="" type="number" min="0" max="180" step="1" maxlength="3"/>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
export default {
  name: 'LightComponent',
  color: '',
  props: { selectedObject: THREE.Light },
  data () {
    return {
      expand: true,
      rad: 0
    }
  },
  methods: {
    changeColor (newValue) {
      this.selectedObject.color.set(newValue)
    },
    isSpotLight () {
      return this.selectedObject instanceof THREE.SpotLight
    }
  },
  computed: {
    angle: {
      get () {
        if(this.selectedObject.angle){
          return Math.round(THREE.Math.radToDeg(this.selectedObject.angle))
        }
        return 10
      },
      set (newValue) {
        this.selectedObject.angle = THREE.Math.degToRad(newValue)
      }
    }
  },
  watch: {
    'selectedObject.color': {
      immediate:true,
      handler (newValue, oldValue) {
        // 设置颜色
        this.color = '#' + this.selectedObject.color.getHexString()
      }
    }
  }
}
</script>

<style>
</style>
