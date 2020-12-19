<template>
  <section>
    <div id="logviewer_root">
      <div id="logviewer_header">
        <a class="tab_item" v-for="(tab, index) in tabs" :key="index" @click="activeTab(index)" :style="index == actived_tab_index ? 'color: #6A9DEA; border-bottom: 1px solid #BBB' : 'color: #555555'">{{ tab.title }}</a>
      </div>
      <div id="logviewer_content">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LogViewer',
  data () {
    return {
      tabs: [
        {
          title: '中端'
        },
        {
          title: '问题'
        },
        {
          title: '输出'
        },
        {
          title: '调试控制台'
        }
      ],
      actived_tab_index: 0
    }
  },
  methods : {
    activeTab (index) {
      this.actived_tab_index = index
    }
  }
}
</script>

<style>
#logviewer_root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#logviewer_header {
  width: 100%;
  height: 30px;
  background: #171C26;
  display: flex;
  flex-direction: row;
}
#logviewer_content {
  width: 100%;
  flex: 1;
  background: #1D232F
}
.tab_item {
  margin: 0px 5px 0px 20px;
  font-size: small;
  color: #72777b;
  user-select: none;
  box-sizing: border-box;
}
.tab_item:hover {
  cursor: pointer
}
</style>
