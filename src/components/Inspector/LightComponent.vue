<template>
  <div id="light_root">
    <div class="inspector_item_title">
      <a>Light</a>
    </div>
    <div class="row_auto_extend_grid">
      <a>颜色</a>
      <el-color-picker v-model="color" @active-change="changeColor"/>
      <a>a</a>
      <a>Color</a>
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
    }
  },
  methods: {
    changeColor (newValue) {
      this.selectedObject.color.set(newValue)
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
