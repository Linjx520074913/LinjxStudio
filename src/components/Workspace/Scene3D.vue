<template>
  <section>
    <div id="scene_3d_root" ref="scene_3d_root" v-resize:throttle="resizePreview">
      <div id="scene_3d_main" ref="scene_3d_main" @dblclick="doubleClick('scene_3d_main')">
        <div class="prompt_container">
          <svg class="view_icon" aria-hidden="true"><use xlink:href="#icon-main_view"></use></svg>
          <a class="view_title">正视图</a>
        </div>
      </div>
      <!-- <div id="scene_3d_left" ref="scene_3d_left" v-show='this.$store.state.show4Views==true' @dblclick="doubleClick('scene_3d_left')">
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
      <div id="scene_3d_bottom" ref="scene_3d_bottom" v-show='this.$store.state.show4Views==true'/> -->
    </div>
  </section>
</template>

<script>
import resize from 'vue-resize-directive'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader'
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

import { ExtSpotLight } from '../../ts/ExtSpotLight'
import { ipcRenderer } from 'electron'
import { ThreeJSEngine } from '../../main/ThreeJSEngine'
import { CameraCreator } from '../../main/CameraCreator'
import { worker } from 'cluster'

export default {
  name: 'Scene3D',
  directives: {
    resize,
  },
  data () {
    return {
      engine: null
    }
  },
  methods: {
    // preview 区域大小改变处理
    resizePreview () {
      // console.log('resizePreview')
      // let mainPreviewW = this.$refs.scene_3d_main.clientWidth
      // let mainPreviewH = this.$refs.scene_3d_main.clientHeight
      // this.mainCamera.aspect = mainPreviewW / mainPreviewH
      // this.mainCamera.updateProjectionMatrix()
      // this.mainRenderer.setSize(mainPreviewW, mainPreviewH)

      // let leftPreviewW = this.$refs.scene_3d_left.clientWidth
      // let leftPreviewH = this.$refs.scene_3d_left.clientHeight
      // this.leftCamera.aspect = leftPreviewW / leftPreviewH
      // this.leftCamera.updateProjectionMatrix()
      // this.leftRenderer.setSize(leftPreviewW, leftPreviewH)

      // let topPreviewW = this.$refs.scene_3d_top.clientWidth
      // let topPreviewH = this.$refs.scene_3d_top.clientHeight
      // this.topCamera.aspect = topPreviewW / topPreviewH
      // this.topCamera.updateProjectionMatrix()
      // this.topRenderer.setSize(topPreviewW, topPreviewH)
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
    handleMouseMoveEvent (event) {
      // 坐标归一化,转换到标准设备坐标系
      // 设备标准坐标系原点在中心，x 往右为正方向 [-1, 1], y 往上为正方向 [-1, 1]
      var sceneMain = this.$refs.scene_3d_main
      this.normalizeMouse.x = (event.offsetX / sceneMain.getBoundingClientRect().width) * 2 - 1
      this.normalizeMouse.y = -(event.offsetY / sceneMain.getBoundingClientRect().height) * 2 + 1
    },
    createThreeJSItem (id) {

      let width = this.$refs.scene_3d_main.clientWidth
      let height = this.$refs.scene_3d_main.clientHeight

      // 创建 scene
      var scene = new THREE.Scene()
      scene.name = '主场景'
      scene.background = new THREE.Color(0xAAAAAA)

      // 创建 Camera
      var camera = CameraCreator.createPerspectiveCamera(45, width / height, 1, 1000)
      camera.position.x = 20
      camera.position.y = 20
      camera.position.z = 15
      camera.lookAt(scene.position)

      // 创建 renderer
      var renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(width, height)
      // 允许阴影投射
      renderer.shadowMap.enabled = true
      // 阴影边渲染出来更加模糊，比默认效果要好
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.$refs.scene_3d_main.appendChild(renderer.domElement)

      var orbitControls = new OrbitControls(camera, renderer.domElement)

      return {
        id: id,
        scene: scene,
        camera: camera,
        renderer: renderer,
        orbitControls: orbitControls,
        renderFlag: true
      }
    }
  },
  created () {
  },
  mounted () {
    var item = this.createThreeJSItem(0)
    ThreeJSEngine.getInstance().addThreeJSItem(item)

    var raycaster = new THREE.Raycaster()
    var mouse = new THREE.Vector2()
    item.renderer.domElement.addEventListener('click', (event) => {
        var w = this.$refs.scene_3d_main.clientWidth
        var h = this.$refs.scene_3d_main.clientHeight
        //屏幕坐标转标准设备坐标
        mouse.x = (event.offsetX / w) * 2 - 1;
        mouse.y = -(event.offsetY / h) * 2 + 1;
        raycaster.setFromCamera(mouse, item.camera)

        //返回射线选中的对象 //第一个参数是检测的目标对象 第二个参数是目标对象的子元素
        let intersects = raycaster.intersectObjects(item.scene.children, true)
        if (intersects.length > 0) {
            console.log(intersects)
        }else{
            console.log("没捕获到对象")
        }
    })
  }
}
</script>

<style scoped>
#scene_3d_root {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100% 0%;
  grid-template-rows: 100% 0%;
}
#scene_3d_main, #scene_3d_left, #scene_3d_top, #scene_3d_bottom {
  border: 0px solid transparent;
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
  user-select: none;
}
</style>
