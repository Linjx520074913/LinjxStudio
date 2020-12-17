<template>
    <div id="about_root">
      <div id="left">
        <el-image id="logo" :src="require('../../assets/orbbec.png')"/>
      </div>
      <div id="right">
        <a>right</a>
      </div>
    </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style>
#about_root{
    width: 100%;
    height: 100%;
    background:#202531;
    display: flex;
    flex-direction: row;
    flex: 1 1
}
#left {
  min-width: 1;
  min-height: 1
}
#logo {
  width: 50px;
  height: 50px;
  margin-left: 20px;
}
</style>
