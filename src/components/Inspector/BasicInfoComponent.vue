<template>
  <div class="basicinfo_root">
    <div class="inspector_item_title" @click="expand =! expand">
      <a>基础属性</a>
    </div>
    <div class="row_auto_extend_grid" v-show="expand">
      <a>类型</a>
      <a>{{ selectedObject.type }}</a>
      <a>名字</a>
      <el-input v-model="selectedObject.name" placeholder=""></el-input>
    </div>
  </div>
</template>

<script>
import { Object3D } from 'three'
import '../../assets/css/inspector.css'

export default {
  name: 'BasicInfoComponent',
  props: ['selectedObject'],
  data () {
    return {
      expand: true
    }
  }
}
</script>

<style>

</style>
