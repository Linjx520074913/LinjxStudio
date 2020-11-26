<template>
  <div id="scene_3d_root" ref="scene_3d_root" v-resize="resizePreview" >
    <div id="scene_3d_main" ref="scene_3d_main" @dblclick="doubleClick('scene_3d_main')"/>
    <div id="scene_3d_left" ref="scene_3d_left" @dblclick="doubleClick('scene_3d_left')"/>
    <div id="scene_3d_top"/>
    <div id="scene_3d_bottom"/>
  </div>
</template>

<script>
import resize from 'vue-resize-directive'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader'
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

export default {
  name: 'Scene3D',
  directives: {
    resize
  },
  data () {
    return {
      scene: null,
      geometry: null,
      material: null,
      mesh: null,
      grid: null,
      cloud: null,
      pcdLoader: null,
      mainCamera: null,
      leftCamera: null,
      mainRenderer: null,
      leftRenderer: null,
      mainControl: null,
      leftControl: null
    }
  },
  methods: {
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
      let width = this.$refs.scene_3d_main.clientWidth
      let height = this.$refs.scene_3d_main.clientHeight
      // 创建 Camera
      this.mainCamera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
      this.mainCamera.position.x = 0
      this.mainCamera.position.y = 20
      this.mainCamera.position.z = 50
      this.mainCamera.lookAt(this.scene.position)

      this.mainRenderer = new THREE.WebGLRenderer({ antialias: true })
      this.mainRenderer.setSize(width, height)
      this.mainRenderer.shadowMap.enable = true
      this.$refs.scene_3d_main.appendChild(this.mainRenderer.domElement)

      this.mainControl = new OrbitControls(this.mainCamera, this.mainRenderer.domElement)
      this.mainControl.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
      this.mainControl.dampingFactor = 0.25
      this.mainControl.screenSpacePanning = false
      this.mainControl.minDistance = 1
      this.mainControl.maxDistance = 10000
      this.mainControl.maxPolarAngle = Math.PI / 2
    },
    initPreviewLeft () {
      let width = this.$refs.scene_3d_left.clientWidth
      let height = this.$refs.scene_3d_left.clientHeight
      // 创建 Camera
      this.leftCamera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
      this.leftCamera.position.x = 10
      this.leftCamera.position.y = 0
      this.leftCamera.position.z = 0
      this.leftCamera.lookAt(this.scene.position)

      this.leftRenderer = new THREE.WebGLRenderer({ antialias: true })
      this.leftRenderer.setSize(width, height)
      this.leftRenderer.shadowMap.enabled = true
      this.$refs.scene_3d_left.appendChild(this.leftRenderer.domElement)

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
      this.grid = new THREE.GridHelper(100, 100, 0x444444, 0x888888)
      this.scene.add(this.grid)
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
      // 显示或隐藏网格
      this.grid.visible = this.$store.state.showGrid
      // 渲染 mainCamera
      this.mainRenderer.render(this.scene, this.mainCamera)
      // 渲染 leftCamera
      this.leftRenderer.render(this.scene, this.leftCamera)
      // 刷新
      requestAnimationFrame(this.renderScene)
    },
    // preview 区域大小改变处理
    resizePreview () {
      let mainPreviewW = this.$refs.scene_3d_main.clientWidth
      let mainPreviewH = this.$refs.scene_3d_main.clientHeight
      this.mainCamera.aspect = mainPreviewW / mainPreviewH
      this.mainCamera.updateProjectionMatrix()
      this.mainRenderer.setSize(mainPreviewW, mainPreviewH)

      let leftPreviewW = this.$refs.scene_3d_left.clientWidth
      let leftPreviewH = this.$refs.scene_3d_left.clientHeight
      this.leftCamera.aspect = leftPreviewW / leftPreviewH
      this.leftCamera.updateProjectionMatrix()
      this.leftRenderer.setSize(leftPreviewW, leftPreviewH)
    },
    doubleClick (id) {
    }
  },
  mounted () {
    this.initRenderer()
    this.renderScene()
  }
}
</script>

<style>
#scene_3d_root {
  width: 100%;
  height: calc(100vh - 96px);
  display: grid;
  flex: 1;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
}
#scene_3d_main, #scene_3d_left, #scene_3d_top, #scene_3d_bottom {
  border: 1px solid #888888;
}
</style>
