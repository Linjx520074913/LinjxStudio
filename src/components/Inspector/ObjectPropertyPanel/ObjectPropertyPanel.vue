<template>
  <div>
    <component v-show='visible' :is='panelName'/>
  </div>
</template>

<script>
import SpotLightPanel from '../SpotLightPanel/SpotLightPanel'
import MeshPanel from '../ObjectPropertyPanel/MeshPropertyPanel'
export default {
  name: 'ObjectPropertyPanel',
  components: {
    SpotLightPanel,
    MeshPanel
  },
  data () {
    return {
      panelName: '',
      visible: false
    }
  },
  activated () {
  },
  methods: {
  },
  mounted () {
    this.$EventBus.$on('showPanel', (name) => {
      this.panelName = name
      this.visible = true
    })
  }
}
</script>

<style>
</style>
