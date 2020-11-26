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
          <div id="preview_root" ref="preview_root" v-resize="resizePreview">
            <div id="preview_main" ref="preview_main" @dblclick="doubleClick('preview_main')"/>
            <div id="preview_left" ref="preview_left" @dblclick="doubleClick('preview_left')"/>
            <div id="preview_top"/>
            <div id="preview_bottom"/>
          </div>
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
import resize from 'vue-resize-directive'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader'
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

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
  directives: {
    resize
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
      geometry: null,
      material: null,
      mesh: null,
      cloud: null,
      pcdLoader: null,
      mainCamera: null,
      leftCamera: null,
      mainRenderer: null,
      leftRenderer: null,
      mainControl: null,
      leftControl: null,
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
      console.log('mouseUp')
      this.selectedResize = ''
      this.lastX = ''
      document.removeEventListener('mousemove', this.mouseMove)
    },
    doubleClick (id) {
    },
    initRenderer () {
      this.scene = new THREE.Scene()
      this.initPreviewMain()
      this.initPreviewLeft()

      this.createGrid()
      this.createAxes()
      // this.createPointCloud()
      this.loadModel()
    },
    initPreviewMain () {
      let width = this.$refs.preview_main.clientWidth
      let height = this.$refs.preview_main.clientHeight
      // 创建 Camera
      this.mainCamera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
      this.mainCamera.position.x = 0
      this.mainCamera.position.y = 20
      this.mainCamera.position.z = 50
      this.mainCamera.lookAt(this.scene.position)

      this.mainRenderer = new THREE.WebGLRenderer({ antialias: true })
      this.mainRenderer.setSize(width, height)
      this.mainRenderer.shadowMap.enable = true
      this.$refs.preview_main.appendChild(this.mainRenderer.domElement)

      this.mainControl = new OrbitControls(this.mainCamera, this.mainRenderer.domElement)
      this.mainControl.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
      this.mainControl.dampingFactor = 0.25
      this.mainControl.screenSpacePanning = false
      this.mainControl.minDistance = 1
      this.mainControl.maxDistance = 10000
      this.mainControl.maxPolarAngle = Math.PI / 2
    },
    initPreviewLeft () {
      let width = this.$refs.preview_left.clientWidth
      let height = this.$refs.preview_left.clientHeight
      // 创建 Camera
      this.leftCamera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
      this.leftCamera.position.x = 10
      this.leftCamera.position.y = 0
      this.leftCamera.position.z = 0
      this.leftCamera.lookAt(this.scene.position)

      this.leftRenderer = new THREE.WebGLRenderer({ antialias: true })
      this.leftRenderer.setSize(width, height)
      this.leftRenderer.shadowMap.enabled = true
      this.$refs.preview_left.appendChild(this.leftRenderer.domElement)

      this.leftControl = new OrbitControls(this.leftCamera, this.leftRenderer.domElement)
      this.leftControl.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
      this.leftControl.dampingFactor = 0.25
      this.leftControl.screenSpacePanning = false
      this.leftControl.minDistance = 0.1
      this.leftControl.maxDistance = 100
      this.leftControl.maxPolarAngle = Math.PI / 2
    },
    // 创建网格辅助线
    createGrid () {
      var grid = new THREE.GridHelper(100, 100, 0x444444, 0x888888)
      this.scene.add(grid)
    },
    // 创建坐标轴及箭头
    createAxes () {
      // 创建坐标轴
      // var axes = new THREE.AxesHelper(3)
      // this.scene.add(axes)

      var arrowLength = 30
      // 创建箭头
      // X 方向箭头
      var xArrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), arrowLength, 0xFF0000, 0.1 * arrowLength, 0.1 * arrowLength)
      this.scene.add(xArrow)
      // Y 方向箭头
      var yArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), arrowLength, 0x00FF00, 0.1 * arrowLength, 0.1 * arrowLength)
      this.scene.add(yArrow)
      // Z 方向箭头
      var zArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), arrowLength, 0x0000FF, 3, 0.1 * arrowLength)
      this.scene.add(zArrow)
    },
    // 创建点云
    createPointCloud () {
      // 创建 THREE.PointCloud 粒子容器
      this.geometry = new THREE.Geometry()
      // 创建 THREE.PointCloud 纹理
      this.material = new THREE.PointCloudMaterial({ size: 0.1, vertexColors: true, color: 0xffffff })

      // 生成随机点
      for (var x = -5; x <= 5; x++) {
        for (var y = -5; y <= 5; y++) {
          var particle = new THREE.Vector3(x, y, 0)
          this.geometry.vertices.push(particle)
          this.geometry.colors.push(new THREE.Color(0xCCCCCC))
        }
      }

      this.cloud = new THREE.PointCloud(this.geometry, this.material)
      this.scene.add(this.cloud)
    },
    loadModel () {
      let scope = this
      const loader = new PCDLoader()
      loader.load('models/Zaghetto.pcd', function (points) {
        var center = points.geometry.boundingSphere.center
        // 模型太小，适当放大
        points.geometry.scale(100, 100, 100)
        points.geometry.translate(-center.x, -center.y, -center.z)
        // 把模型转正，使面朝向 Z 轴正方向
        points.geometry.rotateY(3)
        points.geometry.rotateZ(3)
        scope.scene.add(points)
      })
    },
    // 渲染场景
    renderScene () {
      this.mainRenderer.render(this.scene, this.mainCamera)
      this.leftRenderer.render(this.scene, this.leftCamera)
      requestAnimationFrame(this.renderScene)
    },
    // preview 区域大小改变处理
    resizePreview () {
      let mainPreviewW = this.$refs.preview_main.clientWidth
      let mainPreviewH = this.$refs.preview_main.clientHeight
      this.mainCamera.aspect = mainPreviewW / mainPreviewH
      this.mainCamera.updateProjectionMatrix()
      this.mainRenderer.setSize(mainPreviewW, mainPreviewH)

      let leftPreviewW = this.$refs.preview_left.clientWidth
      let leftPreviewH = this.$refs.preview_left.clientHeight
      this.leftCamera.aspect = leftPreviewW / leftPreviewH
      this.leftCamera.updateProjectionMatrix()
      this.mainRenderer.setSize(leftPreviewW, leftPreviewH)
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
#preview_root {
  width: 100%;
  height: 100%;
  display: grid;
  flex: 1;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
}
#preview_main, #preview_left, #preview_top, #preview_bottom {
  border: 1px solid #888888;
}
/* 拉伸条 */
#resize_left, #resize_right{
  cursor: e-resize;
  width: 5px;
  height: calc(100vh - 64px);
  background-color:#111111;
}

</style>
