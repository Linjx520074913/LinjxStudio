<template>
  <div>
    <a>SpotLight</a>
    <div id='position'>
      <a id='x'>x1</a>
      <a id='y'>y1</a>
      <a id='z'>z</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpotLightPanel'
}
</script>

<style scoped>
a {
  color: #FFF
}
#position {
  display:flex;
  align-items:center;
}
.x, .y, .z {
  float: left
}
</style>
