import * as THREE from 'three'
import { Color, Object3D, SpotLightHelper } from 'three'

export class ExtSpotLight extends THREE.SpotLight{
  // 球体网格
  sphere: THREE.Mesh
  // 球体几何体
  geometry: THREE.SphereGeometry
  // 球体材质
  material: THREE.MeshBasicMaterial
  helper: THREE.SpotLightHelper

  constructor( pos: THREE.Vector3 = new THREE.Vector3(0, 0, 0), color: THREE.Color | string | number = new THREE.Color('#FFFFFF'), intensity: number = 1, distance: number = 20, angle: number = Math.PI / 4, penumbra: number = 0.1, decay: number = 2) {
    super(color, intensity, distance, angle, penumbra, decay)

    this.castShadow = true
    // this.shadow.mapSize.width = 512
    // this.shadow.mapSize.height = 512
    // this.shadow.camera.near = 0.1
    // this.shadow.camera.far = 200
    // this.shadow.focus = 1

    // 创建圆球体
    this.geometry = new THREE.SphereGeometry(0.2, 10, 10)
    this.material = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: false
    })
    this.sphere = new THREE.Mesh(this.geometry, this.material)

    // 创建 SpotLight 及 SpotLightHelper
    this.helper = new SpotLightHelper(this)
    // 【NOTE】 :
    // helper 做为 light 的子对象，要更新正确的 helper 的位置，需要设置
    // 1、this.helper.matrixAutoUpdate = true
    // 2、this.helper.matrix = this.matrix
    // 3、this.helper.upate()
    this.helper.matrixAutoUpdate = true
    this.add(this.sphere)
    this.add(this.helper)
    this.position.set(pos.x, pos.y, pos.z)
    this.update()
  }

  // 更新光照强度，默认为 1
  updateIntensity (value: number) {
    this.intensity = value
    this.updateHelper()
  }

  // 更新光照距离,其强度根据光源距离线性衰减
  updateDistance (value: number) {
    this.distance = value
    this.updateHelper()
  }

  // 更新光线散射角度，即圆锥体的半顶角度，最大为 Math.PI / 2 (90度)
  updateAngle (value: number) {
    this.angle = value
    this.updateHelper()
  }

  // 更新聚光锥的半影衰减百分比，即光照边缘的模糊化程度。在 0 和 1 之间的值。默认为 0，不模糊。
  updatePenumbra (value: number) {
    this.penumbra = value
    this.updateHelper()
  }

  // 更新光照随距离衰减程度
  updateDecay (value: number) {
    this.decay = value
    this.updateHelper()
  }

  // 开启 / 关闭阴影
  enableShadow (value: boolean) {
    this.castShadow = value
  }

  lookAt (targetPos: THREE.Vector3) {
    this.target.position.set(targetPos.x, targetPos.y, targetPos.z)
    this.target.updateMatrixWorld()
    this.updateHelper()

    // https://stackoverflow.com/questions/32203806/three-js-spotlight-orientation-direction-issue
    // 【NOTE】 : 更新 light.target 位置后,光照不生效
    // You have to update your light.target after changing (eg. setting position):
    // light.target.updateMatrixWorld();
    // Or just add your light.target to the scene:
    // scene.add( light.target );
  }

  // 更新光源辅助线
  updateHelper () {
    this.helper.matrix = this.matrix
    this.helper.update()
    this.shadow.camera.updateProjectionMatrix()
  }

  // 显示
  show (visible: boolean) {
    // this.sphere.visible = visible
    this.visible = visible
  }

  // 显示 SoptLightHelper
  showHelper (visible: boolean) {
    this.sphere.visible = visible
    this.helper.visible = visible
  }

  // 光源辅助线是否可见
  isHelperVisible () {
    return this.helper.visible
  }
}