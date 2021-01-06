<template>
  <div id="scenetree_root">
    <div id="scenetree_content">
      <sl-vue-tree ref="slVueTree" v-model="tree" @nodeclick="nodeClick">
        <template slot="title" slot-scope="{ node }">
          <!-- <span class="item-icon">
            <i class="fa fa-file" v-if="node.isLeaf"></i>
            <i class="fa fa-folder" v-if="!node.isLeaf"></i>
          </span> -->
          <a class="tree-text">{{ node.title }}</a>
        </template>

        <template slot="toggle" slot-scope="{ node }">
          <span v-if="!node.isLeaf">
            <i v-if="node.isExpanded" class="fa fa-chevron-down"></i>
            <i v-if="!node.isExpanded" class="fa fa-chevron-right"></i>
          </span>
        </template>
        <template slot="sidebar" slot-scope="{ node }">
          <span class="visible-icon" @click="event => toggleVisibility(event, node)">
            <i v-if="!node.data || node.data.visible !== false" class="fa fa-eye"></i>
            <i v-if="node.data && node.data.visible === false" class="fa fa-eye-slash"></i>
          </span>
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
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

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
      toggleVisibility: function (event, node) {
        const slVueTree = this.$refs.slVueTree
        event.stopPropagation()
        // 
        const visible = !node.data || node.data.visible !== false
        node.data.visible = !visible
        slVueTree.updateNode(node.path, node)
        this.lastEvent = `Node ${node.title} is ${ visible ? 'visible' : 'invisible'} now`

        var object = this.findObject(node.data.uuid)
        if(object != null) {
          object.visible = !visible
        }
        this.nodeClick(node)
      },
      // 处理节点点击事件
      nodeClick(node) {
        // 选中的节点对象的 uuid
        var uuid = node.data.uuid
        // 根据 uuid 找到对应的对象
        var selectedObject = this.findObject(uuid)
        // Inspector 显示选中对象属性面板
        this.$EventBus.$emit('showPanel', selectedObject)
      },
      // 查找 uuid 对象
      findObject (uuid) {
        return this.$store.getters['renderer/findObjectByUuid'](uuid)
      },
      // uuid 对象类型是否包含 Helper 关键字
      isHelper (uuid) {
        // 根据 uuid 找到对应的对象
        var selectedObject = this.$store.getters['renderer/findObjectByUuid'](uuid)
        var res = false
        while(selectedObject){
           if(selectedObject.type.includes("Helper")){
             return true
           }
          selectedObject = selectedObject.parent
        }
        return false
      },
      // uuid 对象或其父对象是否为 TransformControl 实例
      isTransformControl (uuid){
        // 根据 uuid 找到对应的对象
        var selectedObject = this.$store.getters['renderer/findObjectByUuid'](uuid)
        var res = false
        while(selectedObject){
          if(selectedObject instanceof TransformControls){
            return true
          }
          selectedObject = selectedObject.parent
        }
        return false
      },
      // 在 root 列表中查找 uuid 节点
      findNode (uuid) {
        var target
        if(this.tree.length > 0){
          this.$refs.slVueTree.traverse((node, nodeModel, path) => {
            if(node.data.uuid == uuid){
              target = node
              return false
            }
          })
        }
        return target
      },
      // 添加节点
      addNode (parent, node) {
        // 父节点为空，则说明该节点为根节点
        if(null == parent){
          this.tree.push(node)
        }
        // 节点不存在，则添加
        else if(null == this.findNode(node.data.uuid)){
          // 修改父节点 isLeaf 属性，将其设置为 false , 表示该节点不是叶子节点
          this.$refs.slVueTree.updateNode(parent.path, {
            isLeaf: false
          })
          var pos = {
            node: parent,
            placement: 'inside'
          }
          node.isExpanded = false
          node.isLeaf = true
          this.$refs.slVueTree.insert(pos, node)
        }
      },
      // 移除节点
      removeNode (node) {

      },
      // 重建场景树
      buildSceneTree(scene) {
        var sceneUuid = scene.uuid

        scene.traverse( (child) => {

          if(null == this.findNode(child.uuid)){

            // 辅助类节点不在 sceneTree 中显示
            if(this.isHelper(child.uuid) ||
               this.isTransformControl(child.uuid)){
              return
            }

            var parentUuid = (null == child.parent) ? '' : child.parent.uuid
            var parent = this.findNode(parentUuid)
            // 父节点为空，则说明该节点为根节点
            var node = {
              title: child.name == "" ? child.type : child.name,
              isExpanded: true,
              isLeaf: false,
              data: {
                uuid: child.uuid,
                visible: child.visible
              }
            }
            this.addNode(parent, node)
          }
        })
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
  flex: 1
}

.tree-content:hover {
  background: #1F2633!important;
}

.sl-vue-tree.sl-vue-tree-root, .sl-vue-tree-nodes-list {
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: hidden;
  height: 100%;
}

.sl-vue-tree-title {
  display: flex;
  flex-direction: row;
}

.tree-text {
  width: 100px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  flex: 1
}

.item-icon, .sl-vue-tree-sidebar, .sl-vue-tree-toggle {
  display: flex !important;
  align-items: center !important;
  margin-right: 10px;
  justify-content: center !important;
}
.fa {
  line-height: 100%;
  color: white !important
}
</style>
