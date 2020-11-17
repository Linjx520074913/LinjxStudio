<template>
  <el-container>
    <el-header>
      <TitleBar/>
    </el-header>
    <el-main>Main</el-main>
    <el-footer>
      <StatusBar/>
    </el-footer>
  </el-container>
</template>

<script>
import '../assets/css/reset.css'
import TitleBar from './TitleBar'
import StatusBar from './StatusBar'

export default {
  name: 'MainWindow',
  components: {
    TitleBar,
    StatusBar
  }
}
</script>

<style>
#header{
  -webkit-app-region: drag; /* 让元素可拖动，设置了drag的元素不可点击 */
}

.el-header, .el-footer, .el-main{
  margin: 0 !important;
  padding: 0 !important;
}

.el-header, .el-footer {
  height: 32px !important; /* el-header 和 el-footer 默认高度为 60 px, 添加 !important 可以修改默认高度，否则无法修改 */
  background: #B3C0D1;
  text-align: center;
  line-height: 32px;
}
.el-main {
  width: 100%;
  height: calc(100vh - 64px); /* calc(100% - 64px) 这种方式无效 */
}
</style>
