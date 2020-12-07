<template>
    <div id="inspector_container" :width="slw + 'px'">
      <component :is="panelName"/>
    </div>
</template>

<script>
import SpotLightPanel from '../components/Inspector/SpotLightPanel/SpotLightPanel'
export default {
  name: 'Inspector',
  components: {
    SpotLightPanel
  },
  data () {
    return {
      panelName: ''
    }
  },
  props: ['slw'],
  mounted () {
    this.$EventBus.$on('showPanel', (name) => {
      this.panelName = name
    })
  }
}
</script>

<style>
#inspector_container{
  height: 100%;
  background:#141820;
}
</style>
