<template>
    <div id="inspector_container" :width="slw + 'px'">
      <ObjectPropertyPanel/>
    </div>
</template>

<script>
import ObjectPropertyPanel from '../components/Inspector/ObjectPropertyPanel/ObjectPropertyPanel'
export default {
  name: 'Inspector',
  components: {
    ObjectPropertyPanel
  },
  data () {
    return {
      panelName: ''
    }
  },
  props: ['slw'],
  mounted () {

  }
}
</script>

<style>
#inspector_container{
  height: 100%;
  background:#141820;
}
</style>
