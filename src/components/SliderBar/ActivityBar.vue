<template>
  <div id="activity_bar_root">
    <div class="activity_bar_tab_item" v-for="(tab, index) in tabs" :key="index" @click="activeTab(index)">
      <svg class="icon" aria-hidden="true" :style="index == activedTabIndex ? 'color: #6A9DEA; border-left: 2px solid #457DFF' : 'color: #DEDEDE;'"><use v-bind:xlink:href="tab.icon"></use></svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityBar',
  data () {
    return {
      tabs: [
        {
          label: 1,
          icon: '#icon-home'
        },
        {
          label: 2,
          icon: '#icon-history'
        },
        {
          label: 3,
          icon: '#icon-graph'
        },
        {
          label: 4,
          icon: '#icon-work'
        }
      ],
      activedTabIndex: 0
    }
  },
  methods: {
    activeTab (index) {
      this.activedTabIndex = index
    }
  }
}
</script>

<style scoped>
#activity_bar_root {
  width: 50px;
  height: 100%;
  background: #141820;
}
.activity_bar_tab_item {
  height: 60px;
  line-height: 40px;
}
.icon {
  width: 100%;
  height: 100%;
  color: #DEDEDE;
  box-sizing: border-box;
  border-left: 2px solid transparent;
}
/* .icon:hover {
  color: #6A9DEA;
  border-left: 2px solid #457DFF;
} */
</style>
