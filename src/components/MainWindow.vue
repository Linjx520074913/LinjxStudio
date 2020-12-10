<template>
  <div  @mouseup='mouseUp'>
    <el-container>
      <el-header>
        <TitleBar/>
      </el-header>
      <el-container>
        <el-aside :width="currentSliderBarWidth + 'px'">
          <SliderBar :slw="currentSliderBarWidth"/>
        </el-aside>
        <div id='resize_left'></div>
        <el-main id="mainwork_root">
          <Preview/>
        </el-main>
        <div id='resize_right'></div>
        <el-aside :width="currentInspectorWidth + 'px'">
          <Inspector :slw="currentInspectorWidth"/>
        </el-aside>
      </el-container>
      <el-footer>
        <StatusBar/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>

import '../assets/css/reset.css'

import TitleBar from './TitleBar'
import StatusBar from './StatusBar'
import SliderBar from './SliderBar'
import Inspector from './Inspector'
import Preview from './Preview'

export default {
  name: 'MainWindow',
  components: {
    TitleBar,
    StatusBar,
    SliderBar,
    Inspector,
    Preview
  },
  data () {
    return {
      currentSliderBarWidth: 200,
      sliderBarMinW: 150,
      sliderBarMaxW: 350,
      currentInspectorWidth: 300,
      inspectorMinW: 150,
      inspectorMaxW: 350,
      lastX: 0,
      selectedResize: '',
      mainWidth: '50%',
      mainHeight: '50%',
      leftWidth: '50%',
      leftHeight: '50%'
    }
  },
  created () {
    // document.addEventListener('mouseup', this.mouseup)
  },
  methods: {
    mouseDown (event) {
      console.log('mouseDown')
      this.selectedResize = event.target.id
      this.lastX = event.clientX
      document.addEventListener('mousemove', this.mouseMove)
      // this.lastX = event.screenX
    },
    mouseMove (event) {
      var diff = event.clientX - this.lastX
      // 限制 SliderBar 宽度
      if (this.selectedResize === 'resize_left') {
        this.currentSliderBarWidth = this.currentSliderBarWidth + diff
        if (this.currentSliderBarWidth < this.sliderBarMinW) {
          this.currentSliderBarWidth = this.sliderBarMinW
        } else if (this.currentSliderBarWidth > this.sliderBarMaxW) {
          this.currentSliderBarWidth = this.sliderBarMaxW
        }
      } else if (this.selectedResize === 'resize_right') {
        this.currentInspectorWidth = this.currentInspectorWidth - diff
        if (this.currentInspectorWidth < this.inspectorMinW) {
          this.currentInspectorWidth = this.inspectorMinW
        } else if (this.currentInspectorWidth > this.inspectorMaxW) {
          this.currentInspectorWidth = this.inspectorMaxW
        }
      }
      this.lastX = event.clientX
    },
    mouseUp (event) {
      this.selectedResize = ''
      this.lastX = ''
      document.removeEventListener('mousemove', this.mouseMove)
    }
  }
}
</script>

<style>
.el-header, .el-footer, .el-main{
  margin: 0 !important;
  padding: 0 !important;
}

.el-header, .el-footer {
  height: 32px !important; /* el-header 和 el-footer 默认高度为 60 px, 添加 !important 可以修改默认高度，否则无法修改 */
  background-color: #FFFFFF;
  text-align: center;
  line-height: 32px;
}
/* 设置 中间预览区域 el-main 属性 */
/* el-main 中的元素大小占满，设置方法为 ：外层 el-main 用 flex 纵向布局，display: flex; flex-direction: colum; */
/*                                     里层元素设置 display: block; flex: 1; 充满整个高度*/
.el-main {
  width: 100%;
  background-color: #000;
  height: calc(100vh - 64px); /* calc(100% - 64px) 这种方式无效 */
  overflow: hidden !important;
  display: flex;
  flex-direction: colum;
}
/* 拉伸条 */
#resize_left, #resize_right{
  cursor: e-resize;
  width: 1px;
  height: calc(100vh - 64px);
  background-color:#111111;
}

</style>
