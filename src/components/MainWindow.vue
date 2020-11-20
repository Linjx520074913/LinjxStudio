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
        <div id='resize_left'  @mousedown='mouseDown'></div>
        <el-main id="mainwork_root">
        </el-main>
        <div id='resize_right'  @mousedown='mouseDown'></div>
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
      camera: null,
      scene: null,
      renderer: null,
      mesh: null
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
    initThreejs () {
      let container = document.getElementById('mainwork_root')
      this.camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10)
      this.camera.position.z = 0.6
      this.scene = new THREE.Scene()
      let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
      let material = new THREE.MeshNormalMaterial()
      this.mesh = new THREE.Mesh(geometry, material)
      this.scene.add(this.mesh)

      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(this.renderer.domElement)
    },
    animate () {
      requestAnimationFrame(this.animate)
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.02
      this.renderer.render(this.scene, this.camera)
    }
  },
  mounted () {
    this.initThreejs()
    this.animate()
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
  background-color: #000;
  height: calc(100vh - 64px); /* calc(100% - 64px) 这种方式无效 */
}
#resize_left, #resize_right{
  cursor: e-resize;
  width: 5px;
  height: calc(100vh - 64px);
  background-color:#111111;
}
#resize_left #resize_right:hover{

}
</style>
