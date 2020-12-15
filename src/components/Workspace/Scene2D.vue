<template>
  <div id="scene_2d_root" ref="scene_2d_root">
    <h1>我是 2d 预览区11</h1>
  </div>
</template>

<script>
export default {
  name: 'Scene2D'
}
</script>

<style>
/* 设置预览区域属性 */
#scene_2d_root {
  width: 100%;
  /* 区域高度为窗口高度 - titleBar(32px) - toolBar(32px) - statusBar(32px) */
  height: calc(100vh - 96px);
  background-color: white
}
</style>
