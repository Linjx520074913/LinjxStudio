<template>
  <div id="scenetree_root" @click="contextMenuIsVisible = false">
    <div id="scenetree_content">
      <sl-vue-tree ref="slVueTree" v-model="tree" @nodeclick="nodeClick">
        <template slot="title" slot-scope="{ node }">
          <svg class="icon objtype" aria-hidden="true">
            <use v-bind:xlink:href="node.data.icon"></use>
          </svg>
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
import { Action } from '../../main/Action'
import { ipcRenderer } from 'electron'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { Editor } from '@/main/Editor'

export default {
  name: 'SceneTree',
  components: {
    SlVueTree
  },
  data() {
      return {
        editor: Editor.getInstance(),
        tree: [],
        contextMenuIsVisible: false
      }
    },
    created() {
      // 监听 updateSceneTree 信号，更新场景树
      this.editor._signalManager.sceneGraphChanged.add( (scene) => {
        this.buildSceneTree(scene)
      })
    },
    actived () {
    },
    computed: {
    },
    methods: {

      toggleVisibility: function (event, node) {
        // 获取 slVueTree 对象
        const slVueTree = this.$refs.slVueTree
        event.stopPropagation()

        // 更新 slVueTree 状态
        const visible = !node.data || node.data.visible !== false
        node.data.visible = !visible
        slVueTree.updateNode(node.path, node)

        // 发送【物体显示/隐藏】信号
        this.editor._signalManager.objectShown.dispatch(node.data.id, !visible)
        this.nodeClick(node)
      },
      // 处理节点点击事件
      nodeClick(node) {
        // 选中的节点对象的 id
        var id = node.data.id
        // 选中物体
        this.editor.selectObject(id)
      },
      // 在 root 列表中查找 uuid 节点
      findNode (id) {
        var target
        if(this.tree.length > 0){
          this.$refs.slVueTree.traverse((node, nodeModel, path) => {
            if(node.data.id == id){
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
        else if(null == this.findNode(node.data.id)){
          var pos = {
            node: parent,
            placement: 'inside'
          }
          node.isExpanded = false
          node.isLeaf = true
          this.$refs.slVueTree.insert(pos, node)
        }
        this.updateTree()
      },
      // 更新 tree
      updateTree () {
        this.$refs.slVueTree.traverse((node, nodeModel, path) => {
          // 更新节点 isLeaf 属性，当有子节点时，该节点为非叶子节点
          node.isLeaf = node.children.length > 0 ? false : true
          this.$refs.slVueTree.updateNode(node.path, node)
        })
      },
      // 移除节点
      removeNode () {
        // 获取选中的节点
        var selectedNode = this.$refs.slVueTree.getSelected()
        // 获取节点的路径
        var paths = selectedNode.map(n => n.path)
        // 删除节点
        this.$refs.slVueTree.remove(paths)
        // 更新 tree
        this.updateTree()

        // 删除 scene 中对应节点
        // 1、获取 id
        var id = selectedNode[0].data.id
        this.editor.removeObject(id)
      },
      getIcon (type) {
        console.log(type)
        switch(type){
          case 'Group':
            return '#icon-group'
          case 'Mesh':
            return '#icon-mesh'
          default:
            return '#icon-grid'
        }
      },
      // 重建场景树
      buildSceneTree(scene) {
        var sceneUuid = scene.uuid

        scene.traverse( (child) => {

          if(null == this.findNode(child.id)){

            var parentId = (null == child.parent) ? '' : child.parent.id
            var parent = this.findNode(parentId)
            // 父节点为空，则说明该节点为根节点
            var node = {
              title: child.name == '' ? child.type : child.name,
              isExpanded: true,
              isLeaf: false,
              data: {
                id: child.id,
                visible: child.visible,
                icon: this.getIcon(child.type)
              }
            }
            this.addNode(parent, node)
          }
        })
        console.log(scene)
      },
      keyEvent (event) {
        if(event.code == 'Delete'){
          this.removeNode()
        }
      }
    },
    mounted () {
      document.onkeydown = this.keyEvent
    },
    watch: {
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
  font-size: small;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  flex: 1
}

.item-icon, .sl-vue-tree-sidebar, .sl-vue-tree-toggle {
  display: flex !important;
  align-items: center !important;
  margin-right: 0px;
  justify-content: center !important;
}
.fa {
  line-height: 100%;
  color: white !important
}

.objtype {
  height: 30px;
  margin-left: 5px;
  margin-right: 5px
}
</style>
