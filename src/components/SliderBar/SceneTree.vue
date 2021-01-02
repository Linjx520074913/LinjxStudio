<template>
  <div id="scenetree_root">
    <div id="scenetree_content">
      <tree :data="getTree" @node:selected="onNodeSelected">
        <span slot-scope="{ node }">
          <template v-if="!node.hasChildren()">
            <div class="node-item">
              <a class="tree-text"> {{ node.text }} </a>
            </div>
          </template>

          <template v-else>
            <a class="tree-text"> {{ node.text }} </a>
            <svg class="icon" aria-hidden="true" style="margin-left: 10px; margin-right: 10px"> <use xlink:href="#icon-visiable"></use></svg>
          </template>
        </span>
     </tree>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { Object3D } from 'three'
import { truncate, truncateSync } from 'fs';

export default {
  name: 'SceneTree',
  data() {
      return {
        tree: [
        ]
      };
    },
    created() {
    },
    actived () {
    },
    computed: {
      getSceneChildrens () {
        return this.$store.state.renderer.scene.children
      },
      getTree () {
        return this.tree
      }
    },
    methods: {
      onNodeSelected(node) {
        console.log(node)
      },
      // 处理 el-tree 点击事件
      handleNodeClick(node) {
        // 选中的节点对象的 uuid
        var uuid = node.uuid
        // 根据 uuid 找到对应的对象
        var selectedObject = this.$store.getters['renderer/findObjectByUuid'](uuid)
        // Inspector 显示选中对象属性面板
        this.$EventBus.$emit('showPanel', selectedObject)
      },
      // tree: [
      //     {
      //       id: 'linjx',
      //       children: [
      //         {
      //           id: 'linjxq'
      //         }
      //       ]
      //     }
      //   ]
      // 在 root 列表中查找 uuid 节点
      findNode (parent, uuid) {
        for(var child of parent){
          if(child.id == uuid){
            return child
          }else{
            if(child.children && child.children.length){
              return this.findNode(child.children, uuid)
            }
          }
        }
      },
      // 重建场景树
      buildSceneTree(scene) {
        var sceneUuid = scene.uuid
        // TODO : GridHelper、ArrowHelper 等对象需要设置不在 SceneTree 中显示
        // 遍历 parent 下所有的 parent.children 对象
        scene.traverse( (child) => {
          var node = this.findNode(this.tree, child.uuid)
          if(null == node){
            var parentUuid = (child.parent == null) ? '' : child.parent.uuid
            if(parentUuid == '' || parentUuid == sceneUuid){
              var root = this.findNode(this.tree, parentUuid)
              var parentNode = (null == root) ? this.tree : root.children
              parentNode.push({
                text: child.name == '' ? child.type : child.name,
                id: child.uuid,
                children: []
              })
            }
          }
        })
        console.log(this.tree)
      }
    },
    watch: {
      // 监听 scene 中子对象的变化
      getSceneChildrens (childrens) {
        var scene = this.$store.state.renderer.scene
        this.buildSceneTree(scene)
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

.tree-content {
  padding: 0px !important;
  height: 30px !important;
  background: #171C26 !important;
}
.tree-content:hover {
  background: #1F2633!important;
}
.tree-node {
  white-space: normal !important;
}
.tree-anchor {
  padding: 0px !important;
  margin: 0px !important;
}
.node-item {
  height: 30px !important;
  display: flex;
  line-height: 30px !important;
  padding-left: 10px;
}
.tree-text {
  width: 100px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}

</style>
