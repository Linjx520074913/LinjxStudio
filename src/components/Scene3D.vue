<template>
  <div id="scene_3d_root" ref="scene_3d_root" v-resize="resizePreview" >
    <div id="scene_3d_main" ref="scene_3d_main" @dblclick="doubleClick('scene_3d_main')">
      <div class="prompt_container">
        <svg class="view_icon" aria-hidden="true"><use xlink:href="#icon-main_view"></use></svg>
        <a class="view_title">正视图</a>
      </div>
    </div>
    <div id="scene_3d_left" ref="scene_3d_left" v-show='this.$store.state.show4Views==true' @dblclick="doubleClick('scene_3d_left')">
      <div class="prompt_container">
        <svg class="view_icon" aria-hidden="true"><use xlink:href="#icon-left_view"></use></svg>
        <a class="view_title">侧视图</a>
      </div>
    </div>
    <div id="scene_3d_top" ref="scene_3d_top" v-show='this.$store.state.show4Views==true'>
      <div  class="prompt_container">
        <svg class="view_icon" aria-hidden="true"><use xlink:href="#icon-top_view"></use></svg>
        <a class="view_title">俯视图</a>
      </div>
    </div>
    <div id="scene_3d_bottom" ref="scene_3d_bottom" v-show='this.$store.state.show4Views==true'/>
  </div>
</template>

<script>
import resize from 'vue-resize-directive'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader'
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'
import { ExtSpotLight } from '../ts/ExtSpotLight'
import { ipcRenderer } from 'electron'

export default {
  name: 'Scene3D',
  directives: {
    resize
  },
  data () {
    return {
      scene: new THREE.Scene(),
      geometry: null,
      material: null,
      mesh: null,
      grid: null,
      xArrow: null,
      yArrow: null,
      zArrow: null,
      cloud: null,
      pcdLoader: null,
      mainCamera: null,
      leftCamera: null,
      topCamera: null,
      mainRenderer: null,
      leftRenderer: null,
      topRenderer: null,
      mainControl: null,
      leftControl: null,
      topControl: null,
      // 鼠标在 scene_main 上的归一化坐标，范围为[-1,1]
      normalizeMouse: new THREE.Vector2(),
      rayCaster: new THREE.Raycaster(),
      intersected: null
    }
  },
  methods: {
    initRenderer () {
      this.scene.background = new THREE.Color(0xAAAAAA)
      this.initPreviewMain()
      this.initPreviewLeft()
      this.initPreviewTop()

      this.createGrid()
      this.createAxes()

      // this.createPointCloud()
    },
    initPreviewMain () {
      let width = this.$refs.scene_3d_main.clientWidth
      let height = this.$refs.scene_3d_main.clientHeight
      // 创建 Camera
      this.mainCamera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
      this.mainCamera.position.x = 0
      this.mainCamera.position.y = 0
      this.mainCamera.position.z = 15
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
      this.leftCamera.position.x = -15
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
      this.leftControl.enableRotate = false
      this.leftControl.minDistance = 0.1
      this.leftControl.maxDistance = 100
      this.leftControl.maxPolarAngle = Math.PI / 2
    },
    initPreviewTop () {
      let width = this.$refs.scene_3d_top.clientWidth
      let height = this.$refs.scene_3d_top.clientHeight
      // 创建 Camera
      this.topCamera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
      this.topCamera.position.x = 0
      this.topCamera.position.y = 45
      this.topCamera.position.z = 0
      this.topCamera.lookAt(this.scene.position)

      this.topRenderer = new THREE.WebGLRenderer({ antialias: true })
      this.topRenderer.setSize(width, height)
      this.topRenderer.shadowMap.enable = true
      this.$refs.scene_3d_top.appendChild(this.topRenderer.domElement)

      this.topControl = new OrbitControls(this.topCamera, this.topRenderer.domElement)
      this.topControl.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
      this.topControl.dampingFactor = 0.25
      this.topControl.screenSpacePanning = false
      this.topControl.enableRotate = false
      this.topControl.minDistance = 1
      this.topControl.maxDistance = 10000
      this.topControl.maxPolarAngle = Math.PI / 2
    },
    // 创建网格辅助线
    createGrid () {
      this.grid = new THREE.GridHelper(20, 10, 0x444444, 0x888888)
      var array = this.grid.geometry.attributes.color.array
      for (var i = 0; i < array.length; i += 60) {
        for (var j = 0; j < 12; j++) {
          array[i + j] = 0.26
        }
      }
      this.scene.add(this.grid)
    },
    // 创建坐标轴及箭头
    createAxes () {
      // 创建坐标轴
      // var axes = new THREE.AxesHelper(3)
      // this.scene.add(axes)

      var arrowLength = 15
      // 创建箭头
      // X 方向箭头
      this.xArrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), arrowLength, 0xFF0000, 0.1 * arrowLength, 0.1 * arrowLength)
      this.scene.add(this.xArrow)
      // Y 方向箭头
      this.yArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), arrowLength, 0x00FF00, 0.1 * arrowLength, 0.1 * arrowLength)
      this.scene.add(this.yArrow)
      // Z 方向箭头
      this.zArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), arrowLength, 0x0000FF, 3, 0.1 * arrowLength)
      this.scene.add(this.zArrow)
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
    loadModel (path, fileName) {
      // 获取打开的模型文件的后缀
      var extension = fileName.split('.').pop().toLowerCase()
      // var reader = new FileReader()
      let scope = this
      // 根据不同的后缀选择对应的模型加载器
      switch (extension) {
        case 'ply':
          break
        case 'pcd':
          var pcdLoader = new PCDLoader()
          pcdLoader.load(path, function (points) {
            var center = points.geometry.boundingSphere.center
            // 模型太小，适当放大
            points.geometry.scale(40, 40, 40)
            points.geometry.translate(-center.x, -center.y, -center.z)
            // 把模型转正，使面朝向 Z 轴正方向
            points.geometry.rotateY(3)
            points.geometry.rotateZ(3)
            scope.scene.add(points)
          })
          break
        case 'dae':
          var colladaLoader = new ColladaLoader()
          colladaLoader.load(path, function (collada) {
            scope.scene.add(collada.scene)
          })
          break
        case 'obj':
          // reader.addEventListener('load', function (event) {
          //   var contents = event.target.result
          //   var object = new OBJLoader().parse(contents)
          //   scope.scene.add(object)
          // }, false)
          // reader.readAsText(file)
          var objLoader = new OBJLoader()
          objLoader.load(path, function (obj) {
            scope.scene.add(obj)
          }, () => {}, () => {})
          break
        default:
          break
      }
      // let scope = this
      // const loader = new PCDLoader()
      // loader.load('models/Zaghetto.pcd', function (points) {
      //   var center = points.geometry.boundingSphere.center
      //   // 模型太小，适当放大
      //   points.geometry.scale(50, 50, 50)
      //   points.geometry.colors = 0xFF0000
      //   points.geometry.translate(-center.x, -center.y, -center.z)
      //   // 把模型转正，使面朝向 Z 轴正方向
      //   points.geometry.rotateY(3)
      //   points.geometry.rotateZ(3)
      //   scope.scene.add(points)
      // })
      // 加载模型
    },
    // 渲染场景
    renderScene () {
      // 刷新
      requestAnimationFrame(this.renderScene)

      // 显示或隐藏网格
      if (this.grid != null) {
        this.grid.visible = this.$store.state.showGrid
      }

      // 显示或隐藏坐标轴
      this.xArrow.visible = this.$store.state.showAxes
      this.yArrow.visible = this.$store.state.showAxes
      this.zArrow.visible = this.$store.state.showAxes

      // 通过摄像机和鼠标位置更新射线
      // this.rayCaster.setFromCamera(this.normalizeMouse, this.mainCamera)
      // var standarVec = new THREE.Vector3(this.normalizeMouse.x, this.normalizeMouse.y, 1)
      // var worldVec = standarVec.unproject(this.mainCamera)
      // var ray = worldVec.sub(this.mainCamera.position).normalize()
      // var rayCaster = new THREE.Raycaster(this.mainCamera.position, ray)
      // // 计算射线和物体的交点
      // var intersects = rayCaster.intersectObjects(this.scene.children, true)
      // if (intersects.length > 0) {
      //   console.log(intersects)
      //   if (this.intersected !== intersects[0].object) {
      //     if (this.intersected) this.intersected.material.emissive.setHex(this.intersected.currentHex)
      //   }
      // }

      // 渲染 mainCamera
      this.mainRenderer.render(this.scene, this.mainCamera)
      // 渲染 leftCamera
      this.leftRenderer.render(this.scene, this.leftCamera)
      // 渲染 topCamera
      this.topRenderer.render(this.scene, this.topCamera)
    },
    // preview 区域大小改变处理
    resizePreview () {
      console.log('resizePreview')
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

      let topPreviewW = this.$refs.scene_3d_top.clientWidth
      let topPreviewH = this.$refs.scene_3d_top.clientHeight
      this.topCamera.aspect = topPreviewW / topPreviewH
      this.topCamera.updateProjectionMatrix()
      this.topRenderer.setSize(topPreviewW, topPreviewH)
    },
    doubleClick (id) {
      switch (id) {
        case 'scene_3d_main':
          this.$store.commit('toggleViews')
          this.toggleViews(this.$store.state.show4Views)
          break
        case 'scene_3d_left':
          break
        default:
          break
      }
    },
    toggleViews (show4Views) {
      console.log('toggleViews ' + show4Views)
      // 动态改变 scene_3d_root 样式，达到显示 4 视图效果
      if (show4Views) {
        this.$refs.scene_3d_root.style.cssText = 'width:100%; height=calc(100vh - 96px);display: grid;flex: 1;grid-template-columns: 50% 50%;grid-template-rows: 50% 50%'
        this.$refs.scene_3d_main.style.cssText = 'border:1 px solid transparent;width:100%; height:100%;display:flex;'
        this.$refs.scene_3d_left.style.cssText = 'border:1 px solid transparent;width:100%; height:100%;'
        this.$refs.scene_3d_top.style.cssText = 'border:1 px solid transparent;width:100%; height:100%;'
      } else {
        this.$refs.scene_3d_root.style.cssText = 'border:1 px solid transparent;width:100%; height=calc(100vh - 96px);display: grid;flex: 1;grid-template-columns: 100% 0%;grid-template-rows: 100% 0%'
        this.$refs.scene_3d_main.style.cssText = 'border:1 px solid transparent;width:100%; height=calc(100vh - 96px)'
      }
      // 同步修改 renderer 大小
      this.resizePreview()
    },
    addLight (type) {
      switch (type) {
        case 'SpotLight':
          var spotLight = new ExtSpotLight(new THREE.Vector3(0, 0, 1), new THREE.Color(0xFFFFFF), 1, 5)
          this.scene.add(spotLight)
          this.$store.commit('extspotlight/setExtSpotLight', spotLight)
          this.$EventBus.$emit('showPanel', 'SpotLightPanel')
          break
        case 'AmbientLight':
          var ambient = new THREE.AmbientLight(0xF0FF0D)
          this.scene.add(ambient)
          break
      }
    },
    handleMouseMoveEvent (event) {
      // 坐标归一化,转换到标准设备坐标系
      // 设备标准坐标系原点在中心，x 往右为正方向 [-1, 1], y 往上为正方向 [-1, 1]
      var sceneMain = this.$refs.scene_3d_main
      this.normalizeMouse.x = (event.offsetX / sceneMain.getBoundingClientRect().width) * 2 - 1
      this.normalizeMouse.y = -(event.offsetY / sceneMain.getBoundingClientRect().height) * 2 + 1
    }
  },
  created () {
  },
  mounted () {
    this.initRenderer()
    this.renderScene()

    this.$EventBus.$on('openModel', (file) => {
      this.loadModel()
    })

    this.$EventBus.$on('toggleViews', (show4Views) => {
      console.log('toggleViews ' + show4Views)
      this.toggleViews(this.$store.state.show4Views)
    })

    this.$EventBus.$on('loadModel', (path, fileName) => {
      this.loadModel(path, fileName)
    })

    this.$EventBus.$on('addSpotLight', () => {
      this.addLight('SpotLight')
    })

    this.toggleViews(this.$store.state.show4Views)

    this.$refs.scene_3d_main.addEventListener('mousemove', this.handleMouseMoveEvent, false)
  }
}
</script>

<style scoped>
#scene_3d_root {
  width: 100%;
  height: calc(100vh - 96px);
  display: grid;
  flex: 1;
  grid-template-columns: 100% 0%;
  grid-template-rows: 100% 0%;
}
#scene_3d_main, #scene_3d_left, #scene_3d_top, #scene_3d_bottom {
  border: 1px solid transparent;
}
/* 视图左上角图标和标题样式 */
.prompt_container {
  position:absolute;
  z-index:5;
}
.view_icon {
  width:40px;
  height:40px;
}
.view_title {
  float:right;
  height:40px;
  line-height:40px;
}
</style>
