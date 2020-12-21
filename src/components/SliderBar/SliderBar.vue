<template>
  <div id="slider_bar_root" :width="slw + 'px'">
    <ActivityBar/>
    <div id="activity_area">
      <div id="activity_area_header">
        <div class="header_tab" v-for="(tab, index) in tabs" :key="index" @click="activeTab(index)" :style="index == activedTabIndex ? 'color: #6A9DEA; background:#333B4F' : 'color: #555555; background:#262C3B'">
          {{tab.name}}
        </div>
      </div>
      <div id="activity_area_content">
        <component :is="tabs[0].component"/>
      </div>
    </div>
  </div>
</template>

<script>
import ActivityBar from './ActivityBar'
import SceneTree from './SceneTree'
export default {
  name: 'SliderBar',
  components: {
    ActivityBar,
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
  flex-direction: row;
  min-width: 100%; /* 设置该属性，解决 slider_bar_root 大小改变时，背景颜色没有完全填充的问题 */
  width:100%;
  height:100%;
  background:#171C26;
  box-sizing: border-box;
  border-right: 1px solid #111;
}
#activity_area {
  flex: 1
}
#activity_area_header {
  display:flex;
  flex-direction: row;
  width:100%;
  height:30px;
  line-height: 30px;
  text-align: center;
  color: #CCCED3;
}
#activity_area_content {
  width:100%;
}
.header_tab {
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 2px;
  background: #333B4F;
  user-select: none;
}
</style>
