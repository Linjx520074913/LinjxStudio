<template>
  <div id="slider_bar_root" :width="slw + 'px'">
    <div id="slider_bar_header">
      <div class="header_tab" v-for="(tab, index) in tabs" :key="index" @click="activeTab(index)" :style="index == activedTabIndex ? 'color: #6A9DEA; background:#333B4F' : 'color: #555555; background:#262C3B'">
        {{tab.name}}
      </div>
    </div>
    <div id="slider_bar_content">
      <component :is="tabs[0].component"/>
    </div>
  </div>
</template>

<script>
import SceneTree from './SceneTree'
export default {
  name: 'SliderBar',
  components: {
    SceneTree
  },
  props: ['slw'],
  data () {
    return {
      tabs: [
        {
          name: '场景',
          component: 'SceneTree'
        },
        {
          name: '导入',
          component: 'SceneTree'
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

<style>
/* 设置根 div 样式 */
#slider_bar_root{
  display:flex;
  flex-direction: column;
  min-width: 100%; /* 设置该属性，解决 slider_bar_root 大小改变时，背景颜色没有完全填充的问题 */
  width:100%;
  height:100%;
  background:#141820;
}
#slider_bar_header {
  display:flex;
  flex-direction: row;
  width:100%;
  height:30px;
  line-height: 30px;
  text-align: center;
  color: #CCCED3;
}
#slider_bar_content {
  width:100%;
  flex: 1;
}
.header_tab {
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 2px;
  background: #333B4F;
  user-select: none;
}
</style>
