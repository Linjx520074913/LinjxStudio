<template>
<!--  <div>-->
<!--    <a>SpotLight</a>-->
<!--    <div id='position'>-->
<!--      <a id='x'>x1</a>-->
<!--      <a id='y'>y1</a>-->
<!--      <a id='z'>z</a>-->
<!--    </div>-->
<!--  </div>-->
  <section class="tool-side-bar">
    <div class="tab-list">
      <div v-for="(tab, index) in tabs" @click="selectTab(index)"
           class="tab-item">
        {{ tab.name }}
      </div>
    </div>
    <div class="tab-content">
      <component :is="activatedTab.component"/>
    </div>
  </section>
</template>

<script>
import HelloWorld from '../HelloWorld'
import License from '../License'

export default {
  name: 'SpotLightPanel',
  components: {
    HelloWorld,
    License
  },
  data() {
    return {
      tabs: [
        {
          name: "属性",
          component: 'HelloWorld'
        },
        {
          name: "节点",
          component: 'License'
        }
      ],
      activatedTabIndex: 0
    }
  },
  computed: {
    activatedTab() {
      return this.tabs[this.activatedTabIndex]
    }
  },
  methods: {
    selectTab (index) {
      this.activatedTabIndex = index
    },
  }
}
</script>

<style scoped>
  .tool-side-bar {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 32px);
  }
  .tab-list {
    display: flex;
    padding: 20px;
    background: white;
  }
  .tab-item {
    margin-right: 8px;
    cursor: pointer;
  }
  .tab-content {
    flex: 1;
  }
</style>
