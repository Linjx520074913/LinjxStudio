<template>
    <div id="inspector_container" :width="slw + 'px'">
    </div>
</template>

<script>
export default {
  name: 'Inspector',
  props: ['slw']
}
</script>

<style>
#inspector_container{
    height: 100%;
    background:#141820;
}
</style>
