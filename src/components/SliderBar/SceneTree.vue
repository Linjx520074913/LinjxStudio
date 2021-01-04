<template>
  <div id="scenetree_root">
    <div id="scenetree_content">
      <sl-vue-tree ref="slvuetree" v-model="tree" @nodeclick="nodeClick">
        <template slot="title" slot-scope="{ node }">

          <!-- <span class="item-icon">
            <i class="fa fa-file" v-if="node.isLeaf"></i>
            <i class="fa fa-folder" v-if="!node.isLeaf"></i>
          </span> -->
          <a class="tree-text">{{ node.title }}</a>
        </template>
    </sl-vue-tree>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { Object3D } from 'three'
import { truncate, truncateSync } from 'fs'
import SlVueTree, { ISlTreeNode, ISlTreeNodeModel, ICursorPosition } from 'sl-vue-tree'
import 'sl-vue-tree/src/sl-vue-tree-minimal.css'

export default {
  name: 'SceneTree',
  components: {
    SlVueTree
  },
  data() {
      return {
        tree: []
      }
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
      nodeClick(node) {
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
      // 在 root 列表中查找 uuid 节点
      findNode (uuid) {
        var target
        if(this.tree.length > 0){
          this.$refs.slvuetree.traverse((node, nodeModel, path) => {
            if(node.data.uuid == uuid){
              target = node
              return false
            }
          })
        }
        return target
      },
      // 重建场景树
      buildSceneTree(scene) {
        var sceneUuid = scene.uuid

        scene.traverse( (child) => {

          if(null == this.findNode(child.uuid)){
            var parentUuid = (null == child.parent) ? '' : child.parent.uuid
            var parent = this.findNode(parentUuid)
            // 父节点为空，则说明该节点为根节点
            if(null == parent){
              this.tree.push({
                title: child.name == "" ? child.type : child.name,
                isExpanded: true,
                data: {
                  uuid: child.uuid
                }
              })
            }else if(null == this.findNode(child.uuid)){
              this.$refs.slvuetree.updateNode(parent.path, {
                isLeaf: false
              })
              var pos = {
                node: parent,
                placement: 'inside'
              }
              this.$refs.slvuetree.insert(pos, {
                title: child.name == "" ? child.type : child.name,
                isExpanded: false,
                isLeaf: true,
                data: {
                  uuid: child.uuid
                }
              })
            }
          }
        })
        // TODO : GridHelper、ArrowHelper 等对象需要设置不在 SceneTree 中显示
        // 遍历 parent 下所有的 parent.children 对象
        // scene.traverse( (child) => {
        //   var node = this.findNode(this.tree, child.uuid)
        //   if(null == node){
        //     var parentUuid = (child.parent == null) ? '' : child.parent.uuid
        //     if(parentUuid == '' || parentUuid == sceneUuid){
        //       console.log("Child")
        //       console.log(child)
        //       var root = this.findNode(this.tree, parentUuid)
        //       var parentNode = (null == root) ? this.tree : root.children
        //       console.log("Root")
        //       console.log(root)
        //       console.log("ParentNode")
        //       console.log(parentNode)
        //       parentNode.push({
        //         title: child.name == '' ? child.type : child.name,
        //         id: child.uuid,
        //         children: []
        //       })
        //     }
        //   }
        // })
        // console.log(scene)
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
/* .tree-node {
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
} */

.sl-vue-tree-title {
  display: flex !important;
}
.sl-vue-tree-toggle {
  width: 10px !important;
}
.tree-text {
  width: 100px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  flex: 1
}
</style>
