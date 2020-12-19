<template>
  <section>
    <div id="toolbar_root">
      <ul class="toolbar_level_1" v-for="item in content" :key="item.index">
        <svg class="icon" aria-hidden="true" v-on:click="('click' in item) ? item.click() : emptyClick()"><use v-bind:xlink:href="item.icon"></use></svg>
        <li class="toolbar_level_2" v-for="child in item.menu" :key="child.index">
          <el-checkbox class="toolbar_child" v-model="child.value" @change="child.change"/>
          <svg class="icon" v-if="'icon' in child" aria-hidden="true" style="margin-left:10px;height: 100%"> <use v-bind:xlink:href="child.icon"></use></svg>
          <a class="toolbar_child">{{child.title}}</a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ToolBar',
  data () {
    return {
      icon3DColor: this.$store.state.is3D ? '6A9DEA' : 'DEDEDE',
      content: [
        {
          icon: '#icon-more',
          click: () => {},
          menu: [
            {
              icon: '#icon-grid',
              title: '显示坐标网格',
              value: this.$store.state.showGrid,
              change: () => { this.showGrid() }
            },
            {
              icon: '#icon-axes',
              title: '显示坐标轴',
              value: this.$store.state.showAxes,
              change: () => { this.showAxes() }
            },
            {
              icon: '#icon-axes',
              title: '4 视图',
              value: this.$store.state.show4Views,
              change: () => { this.toggleVies() }
            }
          ]
        },
        {
          icon: '#icon-3D',
          click: () => { this.toggle3D() }
        },
        {
          icon: '#icon-rotation'
        },
        {
          icon: '#icon-camera'
        },
        {
          icon: '#icon-translation'
        },
        {
          icon: '#icon-translation'
        },
        {
          icon: '#icon-translation'
        },
        {
          icon: '#icon-translation'
        },
        {
          icon: '#icon-translation'
        },
        {
          icon: '#icon-translation'
        },
        {
          icon: '#icon-eye'
        },
        {
          icon: '#icon-share'
        }
      ]
    }
  },
  methods: {
    toggle3D () {
      this.$store.commit('toggle')
      // 设置 3D 图标选中时的颜色
      this.icon3DColor = this.$store.state.is3D ? '6A9DEA' : 'DEDEDE'
    },
    showGrid () {
      // 改变 showGrid 值， 【Scene3D】 渲染的时候，会根据该值决定是否渲染网格
      this.$store.commit('showGrid')
    },
    showAxes () {
      // 改变 showAxes 值， 【Scene3D】 渲染的时候，会根据该值决定是否渲染坐标轴
      this.$store.commit('showAxes')
    },
    toggleVies () {
      this.$store.commit('toggleViews')
      this.$EventBus.$emit('toggleViews', this.$store.state.show4Views)
    },
    // 空点击函数，当菜单项没有具体指明点击函数时，调用该函数
    emptyClick () {
      console.log('I am empty')
    }
  }
}
</script>

<style scoped>
#toolbar_root {
  margin:0;
  padding:0;
  display: flex;
  height: 30px;
  background-color: #171C26;
}
.icon {
  padding: 0px;
  width: 30px;
  height: 30px;
  color: #DEDEDE;
  /* 预先设置图标的边框，解决 hover 是抖动的问题 */
  /* border:1px solid transparent; */
}
.icon:hover {
  color: #6A9DEA
}
/* 工具栏【一级菜单】 样式*/
.toolbar_level_1 {
  list-style-type:none;
  width: 30px;
  user-select:none; /* 设置文本不可选择 */
  margin: 0px;
}
/* 工具栏【二级菜单】 样式*/
.toolbar_level_2 {
  background-color: #333B4F;
  color: #BBB;
  float: left;
  width: 200px;
  height: 30px;
  position:relative; /*只有设置 position 并且该属性值不为 static 时 z-index 生效 */
  z-index: 100;
  list-style-type:none;
  user-select:none; /* 设置文本不可选择 */
  margin-top: -2px;
  text-align: center;
  display: none /* 二级菜单默认隐藏 */
}
.toolbar_level_2:hover {
  background-color: #1F2633;
}
/* 【一级菜单】 hover 时显示【二级菜单】 */
.toolbar_level_1:hover .toolbar_level_2 {
  display: flex;
}
.toolbar_child {
  align-self: center;
}

</style>
