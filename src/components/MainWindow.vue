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
        <div id="resize"  @mousedown='mouseDown'></div>
        <el-main>
        </el-main>
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

export default {
  name: 'MainWindow',
  components: {
    TitleBar,
    StatusBar,
    SliderBar
  },
  data () {
    return {
      currentSliderBarWidth: 200,
      sliderBarMinW: 200,
      sliderBarMaxW: 400,
      lastX: 0
    }
  },
  created () {
    // document.addEventListener('mouseup', this.mouseup)
  },
  methods: {
    mouseDown (event) {
      console.log('mouseDown')
      this.lastX = event.clientX
      document.addEventListener('mousemove', this.mouseMove)
      // this.lastX = event.screenX
    },
    mouseMove (event) {
      console.log('mouseMove ' + event.button)
      var diff = event.clientX - this.lastX
      this.currentSliderBarWidth = this.currentSliderBarWidth + diff
      // 限制 SliderBar 宽度
      if (this.currentSliderBarWidth < 100) {
        this.currentSliderBarWidth = 100
      }
      this.lastX = event.clientX
    },
    mouseUp (event) {
      console.log('mouseUp')
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
.el-main {
  width: 100%;
  height: calc(100vh - 64px); /* calc(100% - 64px) 这种方式无效 */
}
#resize{
  cursor: col-resize;
  width: 4px;
  height: calc(100vh - 64px);
  background-color: ##00212B
}
.resize:hover{
  color: #444444
}
</style>
