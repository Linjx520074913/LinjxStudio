<template>
  <div id="status_bar">
    <svg class="icon svg-icon" aria-hidden="true" v-on:click="openConsole()">
      <use xlink:href="#icon-console"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'StatusBar',
  methods: {
    openConsole () {
      
    }
  }
}
</script>

<style scoped>
#status_bar{
  display:flex;
  flex-direction: column;
  width:100%;
  height:100%;
  background:#1d232f;
}
.icon {
  width: 25px;
  height: 25px;
}
.icon:hover {
  background:#343940;
  cursor: pointer 
}
</style>
