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
          <div id="preview" ref="preview"></div>
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

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import TitleBar from './TitleBar'
import StatusBar from './StatusBar'
import SliderBar from './SliderBar'
import Inspector from './Inspector'

export default {
  name: 'MainWindow',
  components: {
    TitleBar,
    StatusBar,
    SliderBar,
    Inspector
  },
  data () {
    return {
      currentSliderBarWidth: 200,
      sliderBarMinW: 150,
      sliderBarMaxW: 350,
      currentInspectorWidth: 200,
      inspectorMinW: 150,
      inspectorMaxW: 350,
      lastX: 0,
      selectedResize: '',
      scene: null,
      camera: null,
      renderer: null,
      control: null
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
      console.log('mouseUp')
      this.selectedResize = ''
      this.lastX = ''
      document.removeEventListener('mousemove', this.mouseMove)
    },
    initRenderer () {
      let width = this.$refs.preview.clientWidth
      let height = this.$refs.preview.clientHeight
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 100)
      this.camera.position.x = -4
      this.camera.position.y = 4
      this.camera.position.z = 4
      this.camera.lookAt(this.scene.position)

      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(width, height)
      this.renderer.shadowMapEnabled = true
      this.$refs.preview.appendChild(this.renderer.domElement)
      this.$refs.preview.resize(() => {
        let width = this.$refs.preview.clientWidth
        let height = this.$refs.preview.clientHeight
        this.renderer.setSize(width, height)
      })

      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
      this.controls.dampingFactor = 0.25
      this.controls.screenSpacePanning = false
      this.controls.minDistance = 0.1
      this.controls.maxDistance = 100
      this.controls.maxPolarAngle = Math.PI / 2

      this.createGrid()
    },
    createGrid () {
      var grid = new THREE.GridHelper(30, 30, 0x444444, 0x888888)
      this.scene.add(grid)
    },
    renderScene () {
      requestAnimationFrame(this.renderScene)
      this.renderer.render(this.scene, this.camera)
    }
  },
  mounted () {
    this.initRenderer()
    this.renderScene()
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
/* 设置预览区域属性 */
#preview{
  width: 100%;
  height: 100%;
  display: block;
  flex: 1;
}
/* 拉伸条 */
#resize_left, #resize_right{
  cursor: e-resize;
  width: 5px;
  height: calc(100vh - 64px);
  background-color:#111111;
}
#resize_left #resize_right:hover{

}

</style>
