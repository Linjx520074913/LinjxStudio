<template>
  <div id="toolbar_root">
    <!-- <el-tooltip content="点击切换视图"> -->
    <svg class="icon" aria-hidden="true" v-on:click="toggle3D()" :style="{color: icon3DColor}"> <use xlink:href="#icon-3D"></use></svg>
    <!-- </el-tooltip> -->
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  data () {
    return {
      icon3DColor: this.$store.state.is3D ? '6A9DEA' : 'DEDEDE'
    }
  },
  methods: {
    toggle3D () {
      this.$store.commit('toggle')
      // 设置 3D 图标选中时的颜色
      this.icon3DColor = this.$store.state.is3D ? '6A9DEA' : 'DEDEDE'
    }
  }
}
</script>

<style scoped>
#toolbar_root {
  height: 32px;
  background-color: #171C26;
}
.icon {
  width: 30px;
  height: 30px;
  /* 预先设置图标的边框，解决 hover 是抖动的问题 */
  border:1px solid transparent;
}
</style>
