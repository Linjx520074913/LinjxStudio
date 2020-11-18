<template>
  <div id="slider_bar" :width="slw + 'px'">
  {{slw}}
  </div>
</template>

<script>
export default {
  name: 'SliderBar',
  props: ['slw']
}
</script>

<style>
#slider_bar{
  display:flex;
  min-width: 100%; /* 设置该属性，解决 slider_bar 大小改变时，背景颜色没有完全填充的问题 */
  width:100px;
  height:100%;
  background:#141820;
}
</style>
