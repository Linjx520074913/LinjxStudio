<template>
  <section class="spotlight_panel_root">
    <div class="spotlight_propertys">
      <div v-for="(property, index) in propertys" @click="selectProperty(index)" class="property_item" :style="{background: changeBackground(index)}">
        {{ property.name }}
      </div>
    </div>
    <div class="property_content">
      <!-- 【NOTE】 : 组件切换时，通过 keep-alive 保存组件的状态 -->
      <keep-alive>
        <component :is="activatedProperty.component"/>
      </keep-alive>
    </div>
  </section>
</template>

<script>
import SpotLightPropertyPanel from './SpotLightPropertyPanel'
import SpotLightNode from './SpotLightNode'

export default {
  name: 'SpotLightPanel',
  components: {
    SpotLightPropertyPanel,
    SpotLightNode
  },
  data() {
    return {
      // 属性
      propertys: [
        {
          name: "属性",
          component: 'SpotLightPropertyPanel'
        },
        {
          name: "节点",
          component: 'SpotLightNode'
        }
      ],
      // 选中的属性索引
      selectedPropertyIndex: 0
    }
  },
  computed: {
    activatedProperty() {
      return this.propertys[this.selectedPropertyIndex]
    }
  },
  methods: {
    selectProperty (index) {
      this.selectedPropertyIndex = index
    },
    changeBackground (index) {
      return this.selectedPropertyIndex == index ? '#333B4F' : '#262C3B'
    }
  }
}
</script>

<style scoped>
  .spotlight_panel_root {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 64px);
  }
  .spotlight_propertys {
    display: flex;
    height: 32px;
    text-align: center;
    line-height: 32px;
    color: #CCCED3
  }
  .property_item {
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 2px;
    background: #333B4F;
  }
  .property_content {
    flex: 1;
    background: #333B4F;
  }
</style>
