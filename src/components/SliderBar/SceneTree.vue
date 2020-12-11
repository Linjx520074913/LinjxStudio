<template>
  <div id="scenetree_root">
    <div id="scenetree_content">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick()"></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SceneTree',
  data() {
      return {
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
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
