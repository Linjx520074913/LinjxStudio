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
  flex-direction: row;
  width:100%;
  height: 100%;
  background:#171C26;
  box-sizing: border-box;
  border-top: 1px solid #111;
}
.icon {
  width: 24px;
  height: 24px;
}
.icon:hover {
  background:#343940;
  cursor: pointer 
}
</style>
