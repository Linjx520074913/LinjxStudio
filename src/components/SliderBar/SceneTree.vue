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
        scene: this.$store.state.renderer.scene,
        childrensTree: [],
        defaultProps: {
          label: 'label',
          children: 'children'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      buildChildrensTree() {
        console.log(this.scene)
        this.childrensTree.length = 0
        this.scene.traverse( function(obj) {

        })
        for (var child of this.scene.children) {
          var item = {
            label: child.name == '' ? '' + child.type : child.name
          }
          if (!this.childrensTree.includes(item)) {
            this.childrensTree.push(item)
          }
        }
        console.log(this.childrensTree)
      }
    },
    watch: {
      scene: {
        handler (newValue, oldValue){
          this.buildChildrensTree()
        },
        deep: true
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
  margin: 5px;
  border:1px solid #666
}
.el-tree {
  background: transparent !important
}

.el-tree-node__content, .el-tree-node:focus > .el-tree-node__content {
    background-color: transparent !important;
}
</style>
