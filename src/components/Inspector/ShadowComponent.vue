<template>
  <div id="shadow_root">
    <div class="inspector_item_title">
      <a>Shadow</a>
    </div>
    <div class="row_auto_extend_grid">
      <a>Cast</a>
      <div>
        <el-checkbox v-model="castShadow"></el-checkbox>
        <a></a>
      </div>
      <a>Receive</a>
      <div>
        <el-checkbox v-model="receiveShadow"></el-checkbox>
        <a></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShadowComponent',
  data () {
    return {
      castShadow: true,
      receiveShadow: true
    }
  }
}
</script>

<style>
</style>
