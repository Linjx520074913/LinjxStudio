<template>
  <div id="scenetree_root">
    <div id="scenetree_content">
      <el-tree :data="childrensTree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { Object3D } from 'three'
export default {
  name: 'SceneTree',
  data() {
      return {
        childrensTree: [],
        defaultProps: {
          label: 'label',
          uuid: '',
          children: 'children'
        }
      };
    },
    created() {
    },
    actived () {
    },
    computed: {
      getSceneChildrens () {
        return this.$store.state.renderer.scene.children
      }
    },
    methods: {
      // 处理 el-tree 点击事件
      handleNodeClick(node) {
        // 选中的节点对象的 uuid
        var uuid = node.uuid
        // 根据 uuid 找到对应的对象
        var selectedObject = this.$store.getters['renderer/findObjectByUuid'](uuid)
        // Inspector 显示选中对象属性面板
        this.$EventBus.$emit('showPanel', 'LightPanel', selectedObject)
      },
      // 重建场景树
      buildChildrensTree(parent, node) {
        // 遍历 parent 下所有的 parent.children 对象
        parent.children.forEach( (child, index) => {
          // 判断是否在 childrensTree 中更新 child 对象
          var update = true
          for (item of node.children) {
            if (child.uuid == item.uuid) {
              update = false
              break
            }
          }

          // 往 childrensTree 中添加 child 对象
          if (update) {
            var item = {
            label: child.name == '' ? '' + child.type : child.name,
            uuid: child.uuid,
            children: []
          }
          node.children.push(item)
          this.buildChildrensTree(child, node.children[index])
          }
        })
      }
    },
    watch: {
      // 监听 scene 中子对象的变化
      getSceneChildrens (childrens) {
        var scene = this.$store.state.renderer.scene
        if (this.childrensTree.length == 0) {
          this.childrensTree.push({
          label: 'Scene',
          uuid: scene.uuid,
          children: []
          })
        }
        this.buildChildrensTree(this.$store.state.renderer.scene, this.childrensTree[0])
      }
    }
}
</script>

<style>
#scenetree_root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: colum;
}
#scenetree_content {
  flex: 1;
}
.el-tree {
  background: transparent !important
}

.el-tree-node__content, .el-tree-node:focus > .el-tree-node__content {
    background-color: transparent !important;
}
</style>
